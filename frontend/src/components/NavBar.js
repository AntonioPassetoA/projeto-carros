import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles.css";


function NavBar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      {token && (
        <>
          <Link className="nav-link" to="/cars">Lista de Carros</Link>
          <Link className="nav-link" to="/add-car">Adicionar Carro</Link>
          <button className="btn-logout" onClick={logout}>Sair</button>
        </>
      )}
    </nav>
  );
}

export default NavBar;
