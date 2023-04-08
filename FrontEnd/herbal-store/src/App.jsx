import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

import {
  Home,
  Login,
  ProductDetail,
  Register,
  Cart,
  ShippingDetails,
} from './pages';
import { AdminDash } from './pages';
import { Footer } from './components';

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin" element={<AdminDash />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/cart/:id" element={<Cart />} />
          <Route path="/checkout" element={<ShippingDetails />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;
