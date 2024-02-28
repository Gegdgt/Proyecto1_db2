import React, { useState } from 'react';
import './Navbar.css'; // Importa el archivo CSS para estilos

function Navbar() {
  const [searchTerm, setSearchTerm] = useState('');
  return (
    <div className="navbar">
      <div className="navbar-brand"><a href="/">MyTube</a></div>
      <div className="navbar-search">
      <input
        type="text"
        placeholder="Buscar..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      </div>
      <div className="navbar-links">
        <a href="/login">Iniciar sesión</a>
        <a href="/user">Usuarios</a>
        <a href="Create">Crear</a>
      </div>
    </div>
  );
}

export default Navbar;
