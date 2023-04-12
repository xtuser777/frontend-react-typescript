import React from 'react';
import { Header } from './components/header';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Parameterization } from './pages/Parameterization';
import { User } from './pages/User';

function App() {
  return (
    <BrowserRouter>
      <Header isLogged={true} />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/inicio" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/parametrizacao" element={<Parameterization />} />
          <Route path="//usuario/dados" element={<User />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
