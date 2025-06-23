
import React, { useState } from "react";
import axios from "axios";

function AddCarPage() {
  const [marca, setMarca] = useState("");
  const [modelo, setModelo] = useState("");
  const [ano, setAno] = useState("");
  const [msg, setMsg] = useState("");
  const [erro, setErro] = useState("");

  const handleAdd = async (e) => {
    e.preventDefault();
    setErro(""); setMsg("");
    try {
      await axios.post("http://localhost:4000/api/cars", 
        { marca, modelo, ano: Number(ano) }, 
        { headers: { Authorization: "Bearer " + localStorage.getItem("token") } }
      );
      setMsg("Carro adicionado!");
      setMarca(""); setModelo(""); setAno("");
    } catch (err) {
      setErro(err.response?.data?.error || "Erro ao adicionar");
    }
  };

  return (
    <div>
      <h2>Adicionar Carro</h2>
      {msg && <div style={{ color: "green" }}>{msg}</div>}
      {erro && <div style={{ color: "red" }}>{erro}</div>}
      <form onSubmit={handleAdd}>
        <input value={marca} onChange={e => setMarca(e.target.value)} placeholder="Marca" />
        <input value={modelo} onChange={e => setModelo(e.target.value)} placeholder="Modelo" />
        <input value={ano} onChange={e => setAno(e.target.value)} placeholder="Ano" type="number" />
        <button type="submit">Adicionar</button>
      </form>
    </div>
  );
}

export default AddCarPage;
