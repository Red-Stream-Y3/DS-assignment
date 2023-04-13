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
  OrderConfirm,
  Order,
  Account,
  Shops,
  OrderTracker,
  NotFound,
} from './pages';
import { AdminDash } from './pages';
import { SellerDash } from './pages';
import { Footer } from './components';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <div>
      <ToastContainer />
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
          <Route path="/confirm" element={<OrderConfirm />} />
          <Route path="/order/:id" element={<Order />} />
          <Route path="/seller" element={<SellerDash />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;
