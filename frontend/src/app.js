import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Home from './components/Home';
import LoginCadastro from './components/LoginCadastro';
import AgendamentoDoacao from './components/AgendamentoDoacao';
import Sobre from './components/Sobre'; // Importe o componente Sobre
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* Rota pública - Landing Page */}
        <Route path="/" element={<LandingPage />} />
        
        {/* Rota pública - Login/Cadastro */}
        <Route path="/login" element={<LoginCadastro />} />
        
        {/* Rotas da área logada */}
        <Route path="/home" element={<Home />} />
        <Route path="/agendar" element={<AgendamentoDoacao />} />
        <Route path="/sobre" element={<Sobre />} />
        
        {/* Nova rota pública - Sobre o projeto */}
        <Route path="/sobre" element={<Sobre />} />
        
        {/* Redirecionamentos */}
        <Route path="/LoginCadastro" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;