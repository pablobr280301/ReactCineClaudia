import React, { useState } from 'react';
import { Link } from 'react-router-dom';

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
          <img src="../palomitas.png" alt="logo" className="h-8 mr-2" />
          <h1 className="text-white text-2xl font-bold">Petits Pego</h1>
        </Link>
        
        <div className="flex items-center">
          <Link to="/micuenta" className="text-white hover:text-gray-300 ml-4">Mi cuenta</Link>
          <Link to="/" className="text-white hover:text-gray-300 ml-4">Inicio</Link>
        </div>
      </div>
    </nav>
  );  
};

export default Navbar;
