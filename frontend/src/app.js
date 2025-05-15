import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './components/Telainicial';
import LoginCadastro from './components/LoginCadastro';
//import Login from './components/Login';//
//import Register from './components/Cadastro';//

import './App.css';

function App() {
  return (
    <Router>
   
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/LoginCadastro" element={<LoginCadastro />} />
        
      </Routes>
    </Router>
  );
}

export default App;