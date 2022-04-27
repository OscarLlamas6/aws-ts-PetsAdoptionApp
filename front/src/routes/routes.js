import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from "../pages/login";
import Registro from "../pages/registro";
import Homeusuario from "../pages/homeusuario";
import Homeadmin from "../pages/homeadmin";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>} />
        <Route path='/registro' element={<Registro/>} />
        <Route path='/homeusuario' element={<Homeusuario/>} />
        <Route path='/homeadmin' element={<Homeadmin/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;