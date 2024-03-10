import React from 'react';
import { useSelector } from 'react-redux';

function Cuenta() {
  const entradasPorPelicula = useSelector(state => state.user.entradasPorPelicula);
  const peliculasFavoritas = useSelector(state => state.user.peliculasFavoritas);

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="flex w-2/4">
        <div className="w-1/2 text-white">
          <h2 className="font-bold text-xl text-center">Mis Entradas por Película:</h2>
          <ul>
            {Object.keys(entradasPorPelicula).map(peliculaId => {
              const cantidadEntradas = entradasPorPelicula[peliculaId];
              return (
                <li className="px-4 py-2 text-center" key={peliculaId}>
                  {peliculaId}, Entradas: {cantidadEntradas}
                </li>
              );
            })}
          </ul>
        </div>
        <div className="w-1/2 text-white">
          <h1 className="font-bold text-white text-xl text-center">Mis Películas Favoritas:</h1>
          <div className="  text-center">
            <ul className="px-4">
              {peliculasFavoritas.map(pelicula => (
                <li key={pelicula.id} className="py-2">
                  {pelicula.original_title}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cuenta;
