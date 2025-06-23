
import React from "react";
import { Link, useNavigate } from "react-router-dom";

function NavBar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav>
      {token && (
        <>
          <Link to="/cars">Lista de Carros</Link> | 
          <Link to="/add-car">Adicionar Carro</Link> | 
          <button onClick={logout}>Sair</button>
        </>
      )}
    </nav>
  );
}

export default NavBar;
