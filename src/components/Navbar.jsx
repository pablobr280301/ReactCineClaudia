import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Input from '../imagenes/palomitas.png'; // Importa la imagen utilizando JavaScript

const Navbar = ({ onSearch }) => {
  const [searchKey, setSearchKey] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchKey);
  };

  return (
    <nav className="bg-gray-800 p-4 fixed w-full top-0 z-10 h-16">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center">
        <img src={Input} alt="logo" className="h-8 mr-2" /> {/* Utiliza la variable 'Input' para la ruta de la imagen */}
          <h1 className="text-white text-2xl font-bold">Petits Pego</h1>
        </Link>
        
        <div className="flex items-center">
          <Link to="/" className="text-white hover:text-gray-300 ml-4">Inicio</Link>
          <Link to="/peliculas" className="text-white hover:text-gray-300 ml-4">Peliculas</Link>
          <Link to="/micuenta" className="text-white hover:text-gray-300 ml-4">Mi cuenta</Link>
       {/*    <Link to="/buscador" className="text-white hover:text-gray-300 ml-4">Buscador</Link> */}
        
         
        </div>
      </div>
    </nav>
  );  
};

export default Navbar;
