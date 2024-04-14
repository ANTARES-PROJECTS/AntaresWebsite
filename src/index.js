import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Home from './pages/home';
import Register from './pages/register';
import Login from './pages/login';
import Dashboard from './pages/dashboard';
import Produtos from './pages/produtos';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/account/register" element={<Register />} />
        <Route exact path="/account/login" element={<Login />} />
        <Route exact path="/account/dashboard" element={<Dashboard />} />
        <Route exact path="/plugins" element={<Produtos />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
