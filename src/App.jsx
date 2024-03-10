import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import YouTube from 'react-youtube';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './App.css'; // Este archivo se generará después de compilar el tailwind.css
import Navbar from './components/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import Input from './imagenes/cumple.jpg';
import Input2 from './imagenes/mayores.png';
import Input3 from './imagenes/miercoles.jpg';

import { addEntradas, agregarPeliculaFavorita, eliminarPeliculaFavorita } from '../src/redux/userSlice';


function App() {
  const API_URL = "https://api.themoviedb.org/3";
  const API_KEY = "4f5f43495afcc67e9553f6c684a82f84";
  const IMAGE_PATH = "https://image.tmdb.org/t/p/original";
  const URL_IMAGE = "https://image.tmdb.org/t/p/original";

  const [movies, setMovies] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [trailer, setTrailer] = useState(null);
  const [movie, setMovie] = useState({ title: "Loading Movies" });
  const [playing, setPlaying] = useState(false);
  const [showPurchaseForm, setShowPurchaseForm] = useState(false);
  const [selectedMovieForPurchase, setSelectedMovieForPurchase] = useState(null);
  const [numEntradas, setNumEntradas] = useState(0); // Estado para el número de entradas
  const peliculasFavoritas = useSelector(state => state.user.peliculasFavoritas);

  const dispatch = useDispatch();


  const handleAddToFavorites = () => {
    dispatch(agregarPeliculaFavorita(selectedMovieForPurchase));
  };

  const handleRemoveFromFavorites = (movieId) => {
    dispatch(eliminarPeliculaFavorita(movieId));
  };

 

  const handleCompraClick = (e, movieId) => {
    e.stopPropagation();
    setShowPurchaseForm(false);
    const selectedMovie = movies.find(movie => movie.id === movieId);
    setSelectedMovieForPurchase(selectedMovie);
    dispatch(addEntradas({ peliculaId: movieId, cantidad: numEntradas }));
   };
  

  const handleConfirmPurchase = (e, movieId) => {
    e.stopPropagation();
    setShowPurchaseForm(true);
    const selectedMovie = movies.find(movie => movie.id === movieId);
    setSelectedMovieForPurchase(selectedMovie);
   
  };

  const handleCerrar = (e, movieId) => {
    e.stopPropagation();
    setShowPurchaseForm(false);
   
   
  };

  const fetchMovies = async (searchKey) => {
    const type = searchKey ? "search" : "discover";
    const {
      data: { results },
    } = await axios.get(`${API_URL}/${type}/movie`, {
      params: {
        api_key: API_KEY,
        query: searchKey,
      },
    });

    setMovies(results);
    setMovie(results[0]);

    if (results.length) {
      await fetchMovie(results[0].id);
    }
  };

  const fetchMovie = async (id) => {
    const { data } = await axios.get(`${API_URL}/movie/${id}`, {
      params: {
        api_key: API_KEY,
        append_to_response: "videos",
      },
    });

    if (data.videos && data.videos.results) {
      const trailer = data.videos.results.find(
        (vid) => vid.name === "Official Trailer"
      );
      setTrailer(trailer ? trailer : data.videos.results[0]);
    }

    setMovie(data);
  };

  const selectMovie = async (selectedMovie) => {
    fetchMovie(selectedMovie.id);
    setMovie(selectedMovie);

    window.scrollTo(0, 0);
  };

  const searchMovies = async (e) => {
    e.preventDefault();
    fetchMovies(searchKey);
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };

  return (
    <>
      <div>
        <Navbar />
      </div>

     {/*  <div className="mx-auto text-center p-4">
        <br /> <br />
        <div className='shadow-2xl'>
          <form className="mb-7" onSubmit={searchMovies}>
            <input
              type="text"
              placeholder="Buscar"
              onChange={(e) => setSearchKey(e.target.value)}
              className="p-2 border rounded"
            />
            <button className="btn btn-primary ml-2 px-4 py-2">Buscar</button>
          </form>
        </div> */}

        <main className='w-full text-white'>
          {/* {movie ? (
            <div
              className="viewtrailer mx-auto"
              style={{
                backgroundImage: `url("${IMAGE_PATH}${movie.backdrop_path}")`,
                backgroundSize: "cover",
              }}
            >
              {playing ? (
                <>
                  <div className="flex items-center justify-center h-full">
                    <YouTube
                      videoId={trailer.key}
                      className="object-cover"
                      containerClassName={"youtube-container amru"}
                    />
                  </div>
                  <button onClick={() => setPlaying(false)} className="bg-sky-900 hover:bg-slate-200 hover:text-black text-white font-bold py-2 px-4 rounded-full">
                    Cerrar
                  </button>
                </>
              ) : (
                <div className="trailer bg-cover">
                  <div className="">
                    {trailer ? (
                      <button
                        className="botontrailer"
                        onClick={() => setPlaying(true)}
                        type="button"
                      >
                        Ver Trailer
                      </button>
                    ) : (
                      "Lo siento, no hay trailer disponible"
                    )}
                    <div className='textoAbajo'>
                
                    <button className="btn-comprar">Comprar1</button>
                 

                      <h1 className="text-white">{movie.title}</h1>
                      <p>{movie.overview}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : null} */}
        </main>
        <br /><br /><br /><br />
        <p className='text-white text-center text-xl font-extrabold'> PELICULAS QUE ROMPEN LA TAQUILLA</p>
        <br /><br />


        <div className='px-28  mx-auto'>
          <div>
            <Slider {...settings}>
              {movies.map((movie) => (
                <div
                  key={movie.id}
                  onClick={() => selectMovie(movie)}
                >
                  <img
                    src={`${URL_IMAGE + movie.poster_path}`}
                    alt=""
                    className="w-96"
                  />
                  <h4 className="text-center text-white">{movie.title}</h4>
                </div>
              ))}
            </Slider>
          </div>
        </div>

        <br /><br /><br /><br />

        {/*<div className=" mt-3 ">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full h-96">
            {movies.map((movie) => (
              <div
                key={movie.id}
                className="mb-3 movie-container"
                onClick={() => selectMovie(movie)}
              >
                <img
                  src={`${URL_IMAGE + movie.poster_path}`}
                  alt=""
                  className="w-80  object-cover mx-auto"
                />
                <h1 className="text-center text-white">{movie.title}</h1>
                <button onClick={(e) => handleConfirmPurchase (e, movie.id)} className="btn-comprar">Comprar</button>
              </div>
            ))}
          </div>
        </div>
         {showPurchaseForm && (
          <div className="purchase-form  ">
            <h2>Confirmar compra</h2>
            <div className="movie-info">
              <img src={`${URL_IMAGE + selectedMovieForPurchase.poster_path}`} alt={selectedMovieForPurchase.title} className="movie-poster" />
              <div className="movie-details">
                <h1>{selectedMovieForPurchase.title}</h1>
                <h3>{selectedMovieForPurchase.release_date}</h3>
                <h3>{selectedMovieForPurchase.overview}</h3>
                <br />
                <input type='number' className='h-12 w-28  rgba(255, 0, 0, 0.6) text-black' min={1} value={numEntradas} onChange={(e) => setNumEntradas(parseInt(e.target.value))} />
              </div>
              
            </div>
            <div>
              {peliculasFavoritas.some(movie => movie.id === selectedMovieForPurchase.id) ? (
                <button className='mb-3 ml-3 border-2 border-green-500 px-4 py-2 rounded hover:bg-green-500 hover:text-white' onClick={() => handleRemoveFromFavorites(selectedMovieForPurchase.id)}><b>Eliminar de favoritos</b></button>
              ) : (
                <button className='mb-3 ml-3 border-2 border-green-500 px-4 py-2 rounded hover:bg-green-500 hover:text-white' onClick={handleAddToFavorites}><b>Agregar a favoritos</b></button>
              )}
              </div>
            <div className="purchase-actions">
              <button onClick={handleCerrar} className='text-black bg-red-500/50 px-8 py-2 rounded-lg'>Cancelar compra</button>
              <br /><br />
              
                <button onClick={(e) => handleCompraClick (e, selectedMovieForPurchase.title)} className='bg-green-500/50 px-8 py-2 rounded-lg'>Confirmar compra</button>
              
            </div>
          </div>
        )} 

        <div className='mb-3' ></div>*/}

    {/*   </div> */}
    
    <br />
    
    {/* <div className='pb-28 px-8'>
      jog
      <table>
        <td>
          fsdfdsf
        </td>
        <td>
          fsdfdsf
        </td>
      </table>
    </div> */}
  
    <p className='text-white text-center text-xl px-32'>¡Bienvenidos a Petits Pego, el cine que trae la magia del séptimo arte a Córdoba! 🎬✨  <br /><br />

En el corazón de esta hermosa ciudad, emerge nuestro nuevo cine, Petits Pego, donde la emoción y la diversión se unen en una experiencia cinematográfica única. Ubicado en un lugar privilegiado de Córdoba, estamos listos para deleitar a nuestros espectadores con las últimas películas en la mejor calidad de imagen y sonido.

En Petits Pego, nos enorgullece ofrecer una experiencia de cine excepcional para toda la familia. Desde nuestras cómodas y modernas instalaciones hasta nuestro variado programa de proyecciones, cada visita es una aventura emocionante. Además, nuestro compromiso con la seguridad y el bienestar de nuestros clientes garantiza una experiencia tranquila y placentera para todos.

¡Ven y únete a nosotros en Petits Pego para vivir momentos inolvidables en la pantalla grande! 🎥🍿</p>
     <br /><br /><br /><br /> 
        <p className='text-white text-center text-xl font-extrabold'> NUESTRAS PROMOCIONES DE CINE</p>
    <div class="flex flex-col pb-28 px-8">
  <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8 px-28">
    <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
      <div class="shadow overflow-hidden border-b ">
        <table class="min-w-full divide-y ">
          <thead class="">
            <tr>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">

              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
             
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
             
              </th>
            </tr>
          </thead>
          <tbody class=" divide-y ">
            
            <tr>
              <td class="px-6 py-4 whitespace-nowrap">
                
                <img src={Input} alt="logo" className="h-96 mr-2" /> <br></br>
                <p className='text-white'>¡Celebra tu cumpleaños en grande con nosotros! <br></br> 
                Por tan solo 9 euros, disfruta de una entrada al cine <br></br> 
                 y un delicioso combo de palomitas para hacer de <br></br> 
                 tu día aún más especial.</p>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                
                <img src={Input2} alt="logo" className="h-96 mr-2" /> <br></br>
                <p className='text-white'>¿Eres mayor de 65 años y buscas disfrutar de una <br></br>
                experiencia cinematográfica sin aglomeraciones? <br></br>
                ¡Tenemos la promoción perfecta para ti! Únete a <br></br>
                 nosotros de lunes a jueves y disfruta de tus películas <br></br> favoritas por solo 5 euros.</p>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                
                <img src={Input3} alt="logo" className="h-96 mr-2" /> <br></br>
               <p className='text-white'> En el día del espectador tiramos la casa <br></br>por la ventana,
                puedes venir al cine tan <br></br>solo por 4,50 € la entrada. <br></br> Promoción no válida en festivos.</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>


  </>
  );
}

export default App;
