import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles.css";

function CarListPage() {
  const [cars, setCars] = useState([]);
  const [erro, setErro] = useState("");
  const [editing, setEditing] = useState(null); // id do carro sendo editado
  const [editData, setEditData] = useState({ marca: "", modelo: "", ano: "" });
  const [filter, setFilter] = useState("");

  const token = localStorage.getItem("token");

  // Buscar carros
  useEffect(() => {
    fetchCars();
    // eslint-disable-next-line
  }, []);

  const fetchCars = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/cars", {
        headers: { Authorization: "Bearer " + token }
      });
      setCars(res.data);
    } catch (err) {
      setErro("Erro ao buscar carros");
    }
  };

  // Excluir carro
  const handleDelete = async (id) => {
    if (!window.confirm("Tem certeza que deseja excluir este carro?")) return;
    try {
      await axios.delete(`http://localhost:4000/api/cars/${id}`, {
        headers: { Authorization: "Bearer " + token }
      });
      fetchCars();
    } catch (err) {
      setErro("Erro ao remover");
    }
  };

  // Começar edição
  const handleEdit = (car) => {
    setEditing(car.id);
    setEditData({ marca: car.marca, modelo: car.modelo, ano: car.ano });
  };

  // Cancelar edição
  const handleCancelEdit = () => {
    setEditing(null);
    setEditData({ marca: "", modelo: "", ano: "" });
  };

  // Salvar edição
  const handleSaveEdit = async (id) => {
    try {
      await axios.put(`http://localhost:4000/api/cars/${id}`, editData, {
        headers: { Authorization: "Bearer " + token }
      });
      setEditing(null);
      fetchCars();
    } catch (err) {
      setErro("Erro ao editar");
    }
  };

  // Filtrar carros
  const filteredCars = cars.filter(car =>
    car.marca.toLowerCase().includes(filter.toLowerCase()) ||
    car.modelo.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="center-container">
      <div className="card" style={{ minWidth: 420 }}>
        <h2>Lista de Carros</h2>
        {erro && <div className="msg-erro">{erro}</div>}
        <input
          className="input"
          style={{ marginBottom: 12 }}
          value={filter}
          onChange={e => setFilter(e.target.value)}
          placeholder="Filtrar por marca ou modelo"
        />
        <table className="tabela-carros">
          <thead>
            <tr>
              <th>Marca</th>
              <th>Modelo</th>
              <th>Ano</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {filteredCars.map(car =>
              editing === car.id ? (
                <tr key={car.id}>
                  <td>
                    <input
                      className="input"
                      value={editData.marca}
                      onChange={e => setEditData({ ...editData, marca: e.target.value })}
                    />
                  </td>
                  <td>
                    <input
                      className="input"
                      value={editData.modelo}
                      onChange={e => setEditData({ ...editData, modelo: e.target.value })}
                    />
                  </td>
                  <td>
                    <input
                      className="input"
                      value={editData.ano}
                      type="number"
                      onChange={e => setEditData({ ...editData, ano: e.target.value })}
                    />
                  </td>
                  <td>
                    <button className="btn" onClick={() => handleSaveEdit(car.id)}>Salvar</button>
                    <button className="btn-logout" onClick={handleCancelEdit}>Cancelar</button>
                  </td>
                </tr>
              ) : (
                <tr key={car.id}>
                  <td>{car.marca}</td>
                  <td>{car.modelo}</td>
                  <td>{car.ano}</td>
                  <td>
                    <button className="btn" onClick={() => handleEdit(car)}>Editar</button>
                    <button className="btn-logout" onClick={() => handleDelete(car.id)}>Excluir</button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CarListPage;
