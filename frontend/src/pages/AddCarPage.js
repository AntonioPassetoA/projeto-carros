import React, { useState } from "react";
import axios from "axios";
import "../styles.css";



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
    <div className="center-container">
      <form className="card" onSubmit={handleAdd}>
        <h2>Adicionar Carro</h2>
        {msg && <div className="msg-sucesso">{msg}</div>}
        {erro && <div className="msg-erro">{erro}</div>}
        <input
          className="input"
          value={marca}
          onChange={e => setMarca(e.target.value)}
          placeholder="Marca"
        />
        <input
          className="input"
          value={modelo}
          onChange={e => setModelo(e.target.value)}
          placeholder="Modelo"
        />
        <input
          className="input"
          value={ano}
          onChange={e => setAno(e.target.value)}
          placeholder="Ano"
          type="number"
        />
        <button className="btn" type="submit">Adicionar</button>
      </form>
    </div>
  );
}

export default AddCarPage;
