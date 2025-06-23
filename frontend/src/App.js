
import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import CarListPage from "./pages/CarListPage";
import AddCarPage from "./pages/AddCarPage";
import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/cars" element={<ProtectedRoute><CarListPage /></ProtectedRoute>} />
        <Route path="/add-car" element={<ProtectedRoute><AddCarPage /></ProtectedRoute>} />
        <Route path="*" element={<Navigate to="/cars" />} />
      </Routes>
    </Router>
  );
}

export default App;
