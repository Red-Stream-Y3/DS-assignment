import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

import { Home } from './pages';
import { AdminDash } from './pages';
import ProductDetail from './pages/storeFront/ProductDetail';
import Cart from './pages/storeFront/Cart';
import Login from './pages/Login';
import Register from './pages/Register';

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />{' '}
          <Route path="/admin" element={<AdminDash />} />{' '}
          <Route path="/product/:id" element={<ProductDetail />} />{' '}
          <Route path="/cart" element={<Cart />} />
          <Route path="/cart/:id" element={<Cart />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
