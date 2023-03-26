import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

import { Home } from './pages';
import { AdminDash } from './pages';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<AdminDash />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
