import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Footer.css'; // Importando o CSS para o Footer

// Componente de ícone (opcional, pode ser movido para um arquivo separado de ícones)
const HeartIcon = ({ size = 24, color = "#E63946" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
  </svg>
);

const Footer = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
    window.scrollTo(0, 0);
  };

  return (
    <footer className="site-footer">
      <div className="footer-content">
        <div className="footer-brand">
          <img 
            src="/images/doa+02.png" 
            alt="Doa+ Logo" 
            className="logo-image"
            onClick={() => handleNavigation('/')}
            style={{cursor: 'pointer'}} 
          />
          <p>Conectando doadores a quem precisa no estado de São Paulo</p>
          <div className="newsletter-form">
            <input 
              type="email" 
              placeholder="Seu e-mail" 
              className="newsletter-input" 
              aria-label="Assinar newsletter"
            />
            <button 
              className="newsletter-button"
              aria-label="Assinar"
            >
              Assinar
            </button>
          </div>
        </div>
        
        <div className="link-group">
          <h4>Navegação</h4>
          <ul>
            <li onClick={() => handleNavigation('/home')}>Início</li>
            <li onClick={() => handleNavigation('/agendar')}>Agendar Doação</li>
            <li onClick={() => handleNavigation('/dashboard')}>Consultar Estoque</li>
            <li onClick={() => handleNavigation('/sobre')}>Sobre nós</li>
            <li onClick={() => handleNavigation('/contato')}>Contato</li>
          </ul>
        </div>
        
        <div className="link-group">
          <h4>Informações</h4>
          <ul>
            <li onClick={() => handleNavigation('/requisitos')}>Quem pode doar</li>
            <li onClick={() => handleNavigation('/processo')}>Processo de doação</li>
            <li onClick={() => handleNavigation('/beneficios')}>Benefícios</li>
            <li onClick={() => handleNavigation('/faq')}>Dúvidas frequentes</li>
          </ul>
        </div>
        
        <div className="link-group">
          <h4>Contato</h4>
          <ul>
            <li>(11) 4567-8901</li>
            <li>contato@doesanguesp.org</li>
            <li>Atendimento: 8h-18h</li>
            <li onClick={() => handleNavigation('/localizacao')}>Encontre um hemocentro</li>
          </ul>
        </div>
      </div>
      
      <div className="footer-social">
        <span>Siga-nos:</span>
        <div className="social-icons">
          <span 
            className="social-icon"
            onClick={() => window.open('https://facebook.com', '_blank')}
            aria-label="Facebook"
          >
            f
          </span>
          <span 
            className="social-icon"
            onClick={() => window.open('https://instagram.com', '_blank')}
            aria-label="Instagram"
          >
            in
          </span>
          <span 
            className="social-icon"
            onClick={() => window.open('https://twitter.com', '_blank')}
            aria-label="Twitter"
          >
            t
          </span>
        </div>
      </div>
      
      <div className="footer-copyright">
        <p>© {new Date().getFullYear()} Doe Sangue SP - Todos os direitos reservados</p>
      </div>
    </footer>
  );
};

export default Footer;