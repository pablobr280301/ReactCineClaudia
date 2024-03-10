import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Cuenta from './components/Cuenta.jsx'
/* import Buscador from './components/Buscador.jsx' */
import Peliculas from './Peliculas.jsx'


import './index.css'
import Footer from './components/Footer.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom' 
import Navbar from './components/Navbar.jsx'
import { Provider } from 'react-redux';
import store from '../src/redux/store.js'; 

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' element={<App/>} /> 
     {/*    <Route path='/buscador' element={<Buscador/>} />  */}
        <Route path='/peliculas' element={<Peliculas/>} /> 

        <Route path='/micuenta' element={<Cuenta/>} />
      </Routes>
     
    </BrowserRouter>
     
    
    </Provider>
    <Footer/>
  </React.StrictMode>,
)


