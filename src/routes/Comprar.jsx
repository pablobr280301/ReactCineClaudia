import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addEntradas } from '../redux/userSlice'; // Importa la acción addEntradas desde userSlice


const Comprar = ({ movieId }) => {
  console.log('Movie ID:', movieId); // Agregamos este console.log para verificar el valor de movieId

  const dispatch = useDispatch();

  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [cantidad, setCantidad] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Nombre:', nombre);
    console.log('Email:', email);
    console.log('Cantidad de entradas:', cantidad);
    dispatch(addEntradas({ peliculaId: movieId, cantidad: cantidad }));
  };

  return (
    <div>
      <br />
      <br />
      <br />
      <br />
      <div className="max-w-md mx-auto bg-white rounded p-8 m-4 shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Compra de entradas para la película</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="nombre" className="block text-gray-700">Nombre:</label>
            <input
              type="text"
              id="nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
              className="form-input mt-1 block w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">Correo electrónico:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="form-input mt-1 block w-full"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="cantidad" className="block text-gray-700">Cantidad de entradas:</label>
            <input
              type="number"
              id="cantidad"
              value={cantidad}
              onChange={(e) => setCantidad(parseInt(e.target.value))}
              min={1}
              required
              className="form-input mt-1 block w-full"
            />
          </div>
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Comprar entradas
          </button>
        </form>
      </div>
    </div>
  );
};

export default Comprar;
