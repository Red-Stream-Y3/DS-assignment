import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

import {
  Home,
  Login,
  Register,
  ProductDetail,
  Cart,
  Shipping,
  Payment,
  Order,
  Account,
  Shops,
  OrderTracker,
} from './pages';
import { AdminDash } from './pages';
import { SellerDash } from './pages';
import { Footer } from './components';

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/account" element={<Account />} />
          <Route path="/shops" element={<Shops />} />
          <Route path="/ordertracker" element={<OrderTracker />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin" element={<AdminDash />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/cart/:id" element={<Cart />} />
          <Route path="/checkout" element={<Shipping />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/order/:id" element={<Order />} />
          <Route path="/seller" element={<SellerDash />} />
          <Route path="*" element={<h1 className='text-white'>404: Not Found</h1>} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;