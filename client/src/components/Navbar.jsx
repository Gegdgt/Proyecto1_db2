import React from 'react';
import './Navbar.css'; // Importa el archivo CSS para estilos

function Navbar() {
  return (
    <div className="navbar">
      <div className="navbar-brand"><a href="/">MyTube</a></div>
      <div className="navbar-search">
        <input type="text" placeholder="Buscar..." />
        {/* Aquí puedes agregar lógica para la funcionalidad de búsqueda si es necesario */}
      </div>
      <div className="navbar-links">
        <a href="/playlist">Playlist</a>
        <a href="/user">Usuarios</a>
      </div>
    </div>
  );
}

export default Navbar;