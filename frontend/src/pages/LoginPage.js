import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles.css";



function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErro("");
    try {
      const res = await axios.post("http://localhost:4000/api/login", { username, password });
      localStorage.setItem("token", res.data.token);
      navigate("/cars");
    } catch (err) {
      setErro(err.response?.data?.error || "Erro ao logar");
    }
  };

  return (
    <div className="center-container">
      <form className="card" onSubmit={handleLogin}>
        <h2>Login</h2>
        {erro && <div className="msg-erro">{erro}</div>}
        <input
          className="input"
          value={username}
          onChange={e => setUsername(e.target.value)}
          placeholder="Usuário"
        />
        <input
          className="input"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Senha"
        />
        <button className="btn" type="submit">Entrar</button>
      </form>
    </div>
  );
}

export default LoginPage;
