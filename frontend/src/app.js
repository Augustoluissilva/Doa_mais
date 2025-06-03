import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Home from './components/Home';
import LoginCadastro from './components/LoginCadastro';
import AgendamentoDoacao from './components/AgendamentoDoacao';
import Dashboard from './components/Dashboard'; 
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* Rota pública - Landing Page */}
        <Route path="/" element={<LandingPage />} />
        
        {/* Rota pública - Login/Cadastro */}
        <Route path="/login" element={<LoginCadastro />} />
        
        {/* Rotas da área logada (sem proteção por enquanto) */}
        <Route path="/home" element={<Home />} />
        
        <Route path="/agendar" element={<AgendamentoDoacao />} />
        
        {/* Nova rota para o Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />
        
        {/* Redirecionamento para padronizar a rota de login */}
        <Route path="/LoginCadastro" element={<Navigate to="/login" replace />} />
        
        {/* Página não encontrada - Redireciona para landing page */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;