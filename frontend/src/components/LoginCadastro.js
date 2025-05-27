import React, { useState } from 'react';
import { FaFacebookF, FaGoogle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './LoginCadastro.css';

const LoginPage = () => {
  const [isMoveOverlay, setIsMoveOverlay] = useState(false);
  const navigate = useNavigate();

  // Estados para o formulário de login
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [isLoginLoading, setIsLoginLoading] = useState(false);

  // Estados para o formulário de cadastro
  const [registerName, setRegisterName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPhone, setRegisterPhone] = useState('');
  const [registerBirthDate, setRegisterBirthDate] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState('');
  const [isRegisterLoading, setIsRegisterLoading] = useState(false);

  const moveOverlay = () => {
    setIsMoveOverlay(!isMoveOverlay);
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setIsLoginLoading(true);
    
    try {
      const response = await fetch('http://localhost:3001/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email: loginEmail, 
          password: loginPassword 
        }),
      });
       
      const data = await response.json();
      
      if (response.ok) {
        navigate('/Home'); // Redireciona para a tela inicial após login
      } else {
        alert('Erro ao fazer login: ' + (data.message || 'Credenciais inválidas'));
      }
    } catch (error) {
      console.error('Erro:', error);
      alert('Erro ao conectar com o servidor');
    } finally {
      setIsLoginLoading(false);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    
    // Verifica se as senhas coincidem
    if (registerPassword !== registerConfirmPassword) {
      alert('As senhas não coincidem!');
      return;
    }

    setIsRegisterLoading(true);
    
    try {
      const response = await fetch('http://localhost:3001/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome: registerName,
          email: registerEmail,
          fone: registerPhone,
          data_nascimento: registerBirthDate,
          senha: registerPassword,
        }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        alert('Cadastro bem-sucedido!');
        // Limpa o formulário e volta para o login
        setRegisterName('');
        setRegisterEmail('');
        setRegisterPhone('');
        setRegisterBirthDate('');
        setRegisterPassword('');
        setRegisterConfirmPassword('');
        setIsMoveOverlay(false); // Volta para o painel de login
      } else {
        alert('Erro ao cadastrar: ' + data.message);
      }
    } catch (error) {
      console.error('Erro:', error);
      alert('Erro ao conectar com a API');
    } finally {
      setIsRegisterLoading(false);
    }
  };
   
  return (
    <main>
      <div className={`login-container ${isMoveOverlay ? 'move' : ''}`} id="login-container">
        <div className="form-container">
          {/* Formulário de Login */}
          <form className="form form-login" id="login-form" onSubmit={handleLoginSubmit}>
            <h2 className="form-title">Entrar com</h2>
            <div className="form-social">
              <a href="#" className="social-icon" aria-label="Entrar com Facebook">
                <FaFacebookF />
              </a>
              <a href="#" className="social-icon" aria-label="Entrar com Google">
                <FaGoogle />
              </a>
            </div>
            <p className="form-text">ou utilize sua conta</p>
            <div className="form-input-container">
              <input 
                type="email" 
                className="form-input" 
                placeholder="Email" 
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                required 
              />
              <input 
                type="password" 
                className="form-input" 
                placeholder="Senha" 
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                required 
              />
            </div>
            <a href="#" className="form-link">Esqueceu a senha?</a>
            <button 
              type="submit" 
              className="form-button"
              disabled={isLoginLoading}
            >
              {isLoginLoading ? 'Carregando...' : 'Entrar'}
            </button>
            <p className="mobile-text">
              Não tem conta?
              <a href="#" id="open-register-mobile" onClick={moveOverlay}>Registre-se</a>
              
            </p>
          </form>

          {/* Formulário de Cadastro */}
          <form className="form form-register" id="register-form" onSubmit={handleRegisterSubmit}>
            <h2 className="form-title">Criar Conta</h2>
            <div className="form-social">
              <a href="#" className="social-icon" aria-label="Cadastrar com Facebook">
                <FaFacebookF />
              </a>
              <a href="#" className="social-icon" aria-label="Cadastrar com Google">
                <FaGoogle />
              </a>
            </div>
            <p className="form-text">ou cadastre seu email</p>
            <div className="form-input-container register-inputs">
              <input 
                type="text" 
                className="form-input" 
                placeholder="Nome" 
                value={registerName}
                onChange={(e) => setRegisterName(e.target.value)}
                required 
              />
              <input 
                type="email" 
                className="form-input" 
                placeholder="Email" 
                value={registerEmail}
                onChange={(e) => setRegisterEmail(e.target.value)}
                required 
              />
              <input 
                type="tel" 
                className="form-input" 
                placeholder="Telefone" 
                value={registerPhone}
                onChange={(e) => setRegisterPhone(e.target.value)}
                required 
              />
              <input 
                type="date" 
                className="form-input" 
                placeholder="Data de Nascimento" 
                value={registerBirthDate}
                onChange={(e) => setRegisterBirthDate(e.target.value)}
                required 
              />
              <input 
                type="password" 
                className="form-input" 
                placeholder="Senha" 
                value={registerPassword}
                onChange={(e) => setRegisterPassword(e.target.value)}
                required 
              />
              <input 
                type="password" 
                className="form-input" 
                placeholder="Confirme sua senha" 
                value={registerConfirmPassword}
                onChange={(e) => setRegisterConfirmPassword(e.target.value)}
                required 
              />
            </div>
            <button 
              type="submit" 
              className="form-button"
              disabled={isRegisterLoading}
            >
              {isRegisterLoading ? 'Carregando...' : 'Cadastrar'}
            </button>
            <p className="mobile-text">
              Já tem conta?
              <a href="#" id="open-login-mobile" onClick={moveOverlay}>Entrar</a>
            </p>
          </form>
        </div>
        
        {/* Painel direito */}
        
        <div className="overlay-container">
          <div className="overlay">
            <h2 className="form-title form-title-light">Já tem conta?</h2>
            <p className="form-text form-text-light">Para se manter conectado conosco por gentileza logue com suas informações pessoais</p>
            <button className="form-button form-button-light" id="open-login" onClick={moveOverlay}>Entrar</button>
          </div>
          <div className="overlay">
            <h2 className="form-title form-title-light">Olá, Amigo(a)!</h2>
            <p className="form-text form-text-light">Entre com suas informações e comece sua jornada conosco</p>
            <button className="form-button form-button-light" id="open-register" onClick={moveOverlay}>Cadastrar</button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;