import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Home from './components/Home';
import LoginCadastro from './components/LoginCadastro';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* Rota para a landing page (pública) */}
        <Route path="/" element={<LandingPage />} />
        
        {/* Rota para login/cadastro */}
        <Route path="/LoginCadastro" element={<LoginCadastro />} />
        
        {/* Área logada - Home do app */}
        <Route path="/home" element={<Home />} />
        
        {/* Redirecionamento para páginas não encontradas */}
        <Route path="*" element={<LandingPage />} />
      </Routes>
    </Router>
  );
}

export default App;