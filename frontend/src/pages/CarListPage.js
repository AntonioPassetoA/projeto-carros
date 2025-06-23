
import React, { useEffect, useState } from "react";
import axios from "axios";

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
    <div>
      <h2>Lista de Carros</h2>
      {erro && <div style={{ color: "red" }}>{erro}</div>}
      <ul>
        {cars.map(car => (
          <li key={car.id}>{car.marca} - {car.modelo} - {car.ano}</li>
        ))}
      </ul>
    </div>
  );
}

export default CarListPage;
