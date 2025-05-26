import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/home/index';
import Categoria from '../pages/categoria/index';
import Carrito from '../pages/carrito/index';
import Login from '../pages/login/index';
import Navbar from '../components/navbar';
import WebpayConfirmacion from '../pages/webpayConfirmacion/index';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/categoria/:id" element={<Categoria/>}/>
        <Route path="/carrito" element={<Carrito/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/webpay/confirmar" element={<WebpayConfirmacion />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
