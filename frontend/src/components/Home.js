import React, { useState } from 'react';
import './Home.css';


const DoePlusLogo = () => (
  <img 
    src="/images/doa+02.png" 
    alt="Doa+ Logo" 
    className="logo-image"
  />
);

// Componentes de ícone
const HeartIcon = ({ size, color }) => (
  <span style={{ fontSize: size, color }}>❤</span>
);

const BloodDropIcon = ({ size, color }) => (
  <span style={{ fontSize: size, color }}>💧</span>
);

const CalendarIcon = ({ size, color }) => (
  <span style={{ fontSize: size, color }}>📅</span>
);

const LocationIcon = ({ size, color }) => (
  <span style={{ fontSize: size, color }}>📍</span>
);

const TestimonialIcon = ({ size, color }) => (
  <span style={{ fontSize: size, color }}>💬</span>
);

const UserIcon = ({ size, color }) => (
  <span style={{ fontSize: size, color }}>👤</span>
);

const HomeScreen = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  
  // Dados dos hemocentros do Vale do Paraíba
  const bloodCenters = [
    {
      id: 1,
      name: "Hemocentro de São José dos Campos",
      city: "São José dos Campos",
      stock: {
        "A+": "Médio",
        "A-": "Baixo",
        "B+": "Alto",
        "B-": "Crítico",
        "AB+": "Alto",
        "AB-": "Médio",
        "O+": "Médio",
        "O-": "Crítico"
      }
    },
    {
      id: 2,
      name: "Hemocentro de Taubaté",
      city: "Taubaté",
      stock: {
        "A+": "Alto",
        "A-": "Médio",
        "B+": "Médio",
        "B-": "Baixo",
        "AB+": "Alto",
        "AB-": "Alto",
        "O+": "Crítico",
        "O-": "Crítico"
      }
    },
    {
      id: 3,
      name: "Hemocentro de Jacareí",
      city: "Jacareí",
      stock: {
        "A+": "Médio",
        "A-": "Médio",
        "B+": "Baixo",
        "B-": "Baixo",
        "AB+": "Médio",
        "AB-": "Médio",
        "O+": "Baixo",
        "O-": "Crítico"
      }
    }
  ];

  // Depoimentos
  const testimonials = [
    { 
      id: 1, 
      text: "Doar sangue salvou a vida da minha filha. Gratidão a todos os doadores!", 
      author: "Márcia, mãe de paciente" 
    },
    { 
      id: 2, 
      text: "Sinto que faço a diferença a cada doação. É rápido e indolor!", 
      author: "Carlos, doador frequente" 
    },
    { 
      id: 3, 
      text: "Como profissional de saúde, vejo diariamente a importância das doações.", 
      author: "Dra. Ana, hematologista" 
    }
  ];

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="home-container">
      {/* Menu Superior Fixo */}
      <nav className="navbar">
        <div className="navbar-logo">
          <DoePlusLogo />
        </div>
        
        {/* Hamburger Icon */}
        <div className="hamburger" onClick={toggleMenu}>
          <div className={`hamburger-line ${menuOpen ? 'open' : ''}`}></div>
          <div className={`hamburger-line ${menuOpen ? 'open' : ''}`}></div>
          <div className={`hamburger-line ${menuOpen ? 'open' : ''}`}></div>
        </div>
        
        <ul className={`navbar-menu ${menuOpen ? 'active' : ''}`}>
          <li className="menu-item active">Início</li>
          <li className="menu-item">Agendar Doação</li>
          <li className="menu-item">Consultar Estoque</li>
          <li className="menu-item">Sobre nós</li>
          <li className="menu-item">Contato</li>
          <li className="mobile-menu-item">
            <button className="profile-button mobile">
              <UserIcon size={16} color="#fff" />
              <span>Perfil</span>
            </button>
          </li>
        </ul>
        
        <button className="profile-button desktop">
          <UserIcon size={20} color="#E63946" />
        </button>
      </nav>

      <div className="main-content">
        {/* Banner Principal */}
        <section className="hero-banner">
          <div className="banner-content">
            <h1>Salve vidas com um gesto simples. Doe sangue.</h1>
            <p>No Vale do Paraíba, sua doação faz a diferença para milhares de pessoas.</p>
            <button className="primary-button">
              <CalendarIcon size={18} color="#fff" />
              <span>Agendar Doação</span>
            </button>
          </div>
          <div className="banner-image">
            <div className="banner-overlay"></div>
          </div>
        </section>

        {/* Seção de Hemocentros */}
        <section className="blood-centers-section">
          <h2>Hemocentros no Vale do Paraíba</h2>
          <p>Conheça os centros de doação na região e seu estoque atual</p>
          
          <div className="centers-grid">
            {bloodCenters.map(center => (
              <div key={center.id} className="center-card">
                <h3>{center.name}</h3>
                <p className="city">
                  <LocationIcon size={16} color="#E63946" />
                  {center.city}
                </p>
                
                <div className="stock-section">
                  <h4>Estoque atual:</h4>
                  <div className="stock-grid">
                    {Object.entries(center.stock).map(([type, level]) => (
                      <div key={type} className={`stock-item ${level.toLowerCase()}`}>
                        <span className="blood-type">{type}</span>
                        <div className={`stock-level ${level.toLowerCase()}`}>
                          <div className="level-bar"></div>
                          <span className="level-text">{level}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <button className="secondary-button">
                  <CalendarIcon size={14} color="#E63946" />
                  <span>Agendar neste local</span>
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Seção de Depoimentos */}
        <section className="testimonials-section">
          <div className="section-header">
            <TestimonialIcon size={28} color="#E63946" />
            <h2>Depoimentos</h2>
          </div>
          <p className="section-subtitle">Veja o que doadores e beneficiados têm a dizer</p>
          
          <div className="testimonials-carousel">
            {testimonials.map(testimonial => (
              <div key={testimonial.id} className="testimonial-card">
                <HeartIcon size={24} color="#E63946" />
                <p className="testimonial-text">"{testimonial.text}"</p>
                <p className="testimonial-author">- {testimonial.author}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Rodapé */}
      <footer className="site-footer">
        <div className="footer-content">
          <div className="footer-brand">
            <DoePlusLogo />
            <p>Conectando doadores a quem precisa no Vale do Paraíba</p>
          </div>
          
          <div className="footer-links">
            <div className="link-group">
              <h4>Navegação</h4>
              <ul>
                <li>Início</li>
                <li>Agendar Doação</li>
                <li>Consultar Estoque</li>
                <li>Sobre nós</li>
                <li>Contato</li>
              </ul>
            </div>
            
            <div className="link-group">
              <h4>Informações</h4>
              <ul>
                <li>Quem pode doar</li>
                <li>Processo de doação</li>
                <li>Benefícios</li>
                <li>Dúvidas frequentes</li>
              </ul>
            </div>
            
            <div className="link-group">
              <h4>Contato</h4>
              <ul>
                <li>(12) 3456-7890</li>
                <li>contato@doemais.org</li>
                <li>Atendimento: 8h-18h</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="footer-social">
          <span>Siga-nos:</span>
          <div className="social-icons">
            <span className="social-icon">f</span>
            <span className="social-icon">in</span>
            <span className="social-icon">t</span>
          </div>
        </div>
        
        <div className="footer-copyright">
          <p>© 2023 Doe+ - Todos os direitos reservados</p>
        </div>
      </footer>
    </div>
  );
};

export default HomeScreen;