import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components';

// Componente de Logo
const DoePlusLogo = () => (
  <LogoImage 
    src="/images/doa+02.png" 
    alt="Doa+ Logo" 
  />
);

// Componente de ícone de usuário
const UserIcon = ({ size = 24, color = "#E63946" }) => (
  <span style={{ fontSize: size, color }}>👤</span>
);

// Estilos com Styled Components
const NavbarContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: ${({ theme }) => theme.white};
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
  width: 100%;
  transition: all 0.3s ease;

  ${({ $isScrolled }) => $isScrolled && css`
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
  `}

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const LogoImage = styled.img`
  height: 50px;
  width: auto;
  object-fit: contain;
  transition: transform 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    height: 40px;
  }
`;

const Hamburger = styled.div`
  display: none;
  flex-direction: column;
  justify-content: space-between;
  width: 24px;
  height: 18px;
  cursor: pointer;
  z-index: 1001;

  @media (max-width: 768px) {
    display: flex;
  }
`;

const HamburgerLine = styled.div`
  width: 100%;
  height: 2px;
  background-color: ${({ theme }) => theme.primaryColor};
  transition: all 0.3s ease;

  ${({ $open }) => $open && css`
    &:nth-child(1) {
      transform: translateY(8px) rotate(45deg);
    }
    &:nth-child(2) {
      opacity: 0;
    }
    &:nth-child(3) {
      transform: translateY(-8px) rotate(-45deg);
    }
  `}
`;

const NavMenu = styled.ul`
  display: flex;
  list-style: none;
  gap: 2rem;

  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    right: -100%;
    width: 70%;
    height: 100vh;
    background-color: ${({ theme }) => theme.white};
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    transition: right 0.3s ease;
    box-shadow: -5px 0 15px rgba(0, 0, 0, 0.1);
    z-index: 1000;

    ${({ $menuOpen }) => $menuOpen && css`
      right: 0;
    `}
  }
`;

const MenuItem = styled.li`
  cursor: pointer;
  font-weight: 500;
  padding: 0.5rem 0;
  position: relative;
  transition: color 0.3s ease;
  font-size: ${({ $mobile }) => $mobile ? '1.2rem' : 'inherit'};

  &:hover {
    color: ${({ theme }) => theme.primaryColor};
  }

  ${({ $active }) => $active && css`
    color: ${({ theme }) => theme.primaryColor};

    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 2px;
      background-color: ${({ theme }) => theme.primaryColor};
    }
  `}
`;

const ProfileButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;

  ${({ $desktop }) => $desktop ? css`
    padding: 0.5rem;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    justify-content: center;

    &:hover {
      background-color: rgba(230, 57, 70, 0.1);
    }

    @media (max-width: 768px) {
      display: none;
    }
  ` : css`
    background-color: ${({ theme }) => theme.primaryColor};
    color: ${({ theme }) => theme.white};
    padding: 0.8rem 1.5rem;
    border-radius: 50px;
    font-weight: 600;
    width: 100%;
    justify-content: center;

    &:hover {
      background-color: ${({ theme }) => theme.primaryDark};
    }
  `}
`;

const MobileMenuItem = styled.li`
  display: none;
  width: 100%;
  text-align: center;
  padding: 0 2rem;

  @media (max-width: 768px) {
    display: block;
  }
`;

// Tema com as cores
const theme = {
  primaryColor: '#E63946',
  primaryLight: '#FF6B6B',
  primaryDark: '#C1121F',
  white: '#FFFFFF',
  black: '#212529'
};

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
    <NavbarContainer $isScrolled={isScrolled} theme={theme}>
      <div className="navbar-logo" onClick={() => handleNavigation('/')}>
        <DoePlusLogo />
      </div>
      
      <Hamburger onClick={toggleMenu}>
        <HamburgerLine $open={menuOpen} theme={theme} />
        <HamburgerLine $open={menuOpen} theme={theme} />
        <HamburgerLine $open={menuOpen} theme={theme} />
      </Hamburger>
      
      <NavMenu $menuOpen={menuOpen} theme={theme}>
        <MenuItem 
          $active 
          onClick={() => handleNavigation('/home')}
          $mobile
        >
          Início
        </MenuItem>
        <MenuItem onClick={() => handleNavigation('/agendar')} $mobile>
          Agendar Doação
        </MenuItem>
        <MenuItem onClick={() => handleNavigation('/dashboard')} $mobile>
          Consultar Estoque
        </MenuItem>
        <MenuItem onClick={() => handleNavigation('/sobre')} $mobile>
          Sobre nós
        </MenuItem>
        <MenuItem onClick={() => handleNavigation('/contato')} $mobile>
          Contato
        </MenuItem>
        <MobileMenuItem>
          <ProfileButton 
            onClick={() => handleNavigation('/perfil')}
            theme={theme}
          >
            <UserIcon size={16} color="#fff" />
            <span>Perfil</span>
          </ProfileButton>
        </MobileMenuItem>
      </NavMenu>
      
      <ProfileButton 
        $desktop 
        onClick={() => handleNavigation('/perfil')}
        theme={theme}
      >
        <UserIcon size={20} color="#E63946" />
      </ProfileButton>
    </NavbarContainer>
  );
};

export default Navbar;