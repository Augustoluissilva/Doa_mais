import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css'; // Import the CSS file

// Componente de Logo
const DoePlusLogo = () => (
  <img 
    className="logo-image"
    src="/images/doa+02.png" 
    alt="Doa+ Logo" 
  />
);

// Componente de ícone de usuário
const UserIcon = ({ size = 24, color = "#E63946" }) => (
  <span style={{ fontSize: size, color }}>👤</span>
);

const Navbar = ({ isScrolled }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleNavigation = (path) => {
    navigate(path);
    setMenuOpen(false);
    window.scrollTo(0, 0);
  };

  return (
    <>
      <nav className={`navbar-container ${isScrolled ? 'scrolled' : ''}`}>
        <div className="navbar-logo" onClick={() => handleNavigation('/')}>
          <DoePlusLogo />
        </div>
        
        <div 
          className={`hamburger ${menuOpen ? 'open' : ''}`} 
          onClick={toggleMenu}
        >
          <div className="hamburger-line"></div>
          <div className="hamburger-line"></div>
          <div className="hamburger-line"></div>
        </div>
        
        <ul className={`nav-menu ${menuOpen ? 'menu-open' : ''}`}>
          <li 
            className="menu-item mobile"
            onClick={() => handleNavigation('/home')}
          >
            Início
          </li>
          <li 
            className="menu-item mobile"
            onClick={() => handleNavigation('/agendar')}
          >
            Agendar Doação
          </li>
          <li 
            className="menu-item mobile"
            onClick={() => handleNavigation('/dashboard')}
          >
            Consultar Estoque
          </li>
          <li 
            className="menu-item mobile"
            onClick={() => handleNavigation('/sobre')}
          >
            Sobre nós
          </li>
          <li 
            className="menu-item mobile"
            onClick={() => handleNavigation('/contato')}
          >
            Contato
          </li>
          <li className="mobile-menu-item">
            <button 
              className="profile-button"
              onClick={() => handleNavigation('/perfil')}
            >
              <UserIcon size={16} color="#fff" />
              <span>Perfil</span>
            </button>
          </li>
        </ul>
        
        <button 
          className="profile-button desktop"
          onClick={() => handleNavigation('/perfil')}
        >
          <UserIcon size={20} color="#E63946" />
        </button>
      </nav>
      
      <div 
        className={`overlay ${menuOpen ? 'menu-open' : ''}`} 
        onClick={toggleMenu} 
      />
    </>
  );
};

export default Navbar;