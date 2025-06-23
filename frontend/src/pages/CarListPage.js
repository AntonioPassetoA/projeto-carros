import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles.css";



function CarListPage() {
  const [cars, setCars] = useState([]);
  const [erro, setErro] = useState("");

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/cars", {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") }
        });
        setCars(res.data);
      } catch (err) {
        setErro("Erro ao buscar carros");
      }
    };
    fetchCars();
  }, []);

  return (
    <div className="center-container">
      <div className="card" style={{ minWidth: 380 }}>
        <h2>Lista de Carros</h2>
        {erro && <div className="msg-erro">{erro}</div>}
        <table className="tabela-carros">
          <thead>
            <tr>
              <th>Marca</th>
              <th>Modelo</th>
              <th>Ano</th>
            </tr>
          </thead>
          <tbody>
            {cars.map(car => (
              <tr key={car.id}>
                <td>{car.marca}</td>
                <td>{car.modelo}</td>
                <td>{car.ano}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CarListPage;
