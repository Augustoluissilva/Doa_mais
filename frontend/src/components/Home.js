import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const DoePlusLogo = () => (
  <img 
    src="/images/doa+02.png" 
    alt="Doa+ Logo" 
    className="logo-image"
  />
);

// Componentes de ícone
const HeartIcon = ({ size = 24, color = "#E63946" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
  </svg>
);

const BloodDropIcon = ({ size = 24, color = "#E63946" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
    <path d="M12 21.35l-.38-.33C6.24 16.06 3 12.59 3 8.5 3 5.42 5.42 3 8.5 3c1.74 0 3.41.81 4.5 2.09C14.09 3.81 15.76 3 17.5 3 20.58 3 23 5.42 23 8.5c0 4.09-3.24 7.56-8.62 12.52l-.38.33zM12 2c-2.65 0-5 1.57-6 4.03C4.5 10.08 12 16 12 16s7.5-5.92 6-9.97C17 3.57 14.65 2 12 2z"/>
  </svg>
);

const CalendarIcon = ({ size = 24, color = "#E63946" }) => (
  <span style={{ fontSize: size, color }}>📅</span>
);

const LocationIcon = ({ size = 24, color = "#E63946" }) => (
  <span style={{ fontSize: size, color }}>📍</span>
);

const TestimonialIcon = ({ size = 24, color = "#E63946" }) => (
  <span style={{ fontSize: size, color }}>💬</span>
);

const UserIcon = ({ size = 24, color = "#E63946" }) => (
  <span style={{ fontSize: size, color }}>👤</span>
);

const ClickIcon = ({ size = 24, color = "#E63946" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
    <path d="M11 4.5V2.5C11 2.224 11.224 2 11.5 2C11.776 2 12 2.224 12 2.5V4.5C12 4.776 11.776 5 11.5 5C11.224 5 11 4.776 11 4.5ZM15.5 3C15.224 3 15 3.224 15 3.5V5.5C15 5.776 15.224 6 15.5 6C15.776 6 16 5.776 16 5.5V3.5C16 3.224 15.776 3 15.5 3ZM7.5 3C7.224 3 7 3.224 7 3.5V5.5C7 5.776 7.224 6 7.5 6C7.776 6 8 5.776 8 5.5V3.5C8 3.224 7.776 3 7.5 3ZM4.5 6C4.224 6 4 6.224 4 6.5V8.5C4 8.776 4.224 9 4.5 9C4.776 9 5 8.776 5 8.5V6.5C5 6.224 4.776 6 4.5 6ZM18.5 6C18.224 6 18 6.224 18 6.5V8.5C18 8.776 18.224 9 18.5 9C18.776 9 19 8.776 19 8.5V6.5C19 6.224 18.776 6 18.5 6ZM2 10.5V12.5C2 12.776 2.224 13 2.5 13C2.776 13 3 12.776 3 12.5V10.5C3 10.224 2.776 10 2.5 10C2.224 10 2 10.224 2 10.5ZM21 10.5V12.5C21 12.776 21.224 13 21.5 13C21.776 13 22 12.776 22 12.5V10.5C22 10.224 21.776 10 21.5 10C21.224 10 21 10.224 21 10.5ZM11.5 14C11.224 14 11 14.224 11 14.5V16.5C11 16.776 11.224 17 11.5 17C11.776 17 12 16.776 12 16.5V14.5C12 14.224 11.776 14 11.5 14ZM15.5 14C15.224 14 15 14.224 15 14.5V16.5C15 16.776 15.224 17 15.5 17C15.776 17 16 16.776 16 16.5V14.5C16 14.224 15.776 14 15.5 14ZM7.5 14C7.224 14 7 14.224 7 14.5V16.5C7 16.776 7.224 17 7.5 17C7.776 17 8 16.776 8 16.5V14.5C8 14.224 7.776 14 7.5 14ZM4.5 17C4.224 17 4 17.224 4 17.5V19.5C4 19.776 4.224 20 4.5 20C4.776 20 5 19.776 5 19.5V17.5C5 17.224 4.776 17 4.5 17ZM18.5 17C18.224 17 18 17.224 18 17.5V19.5C18 19.776 18.224 20 18.5 20C18.776 20 19 19.776 19 19.5V17.5C19 17.224 18.776 17 18.5 17ZM2 21.5V19.5C2 19.224 2.224 19 2.5 19C2.776 19 3 19.224 3 19.5V21.5C3 21.776 2.776 22 2.5 22C2.224 22 2 21.776 2 21.5ZM21 21.5V19.5C21 19.224 21.224 19 21.5 19C21.776 19 22 19.224 22 19.5V21.5C22 21.776 21.776 22 21.5 22C21.224 22 21 21.776 21 21.5Z"/>
  </svg>
);

const HomeScreen = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState('Salva vidas');
  const navigate = useNavigate();
  
  // Dados dos hemocentros do estado de São Paulo
  const bloodCenters = [
    {
      id: 1,
      name: "Hemocentro de São Paulo",
      city: "São Paulo",
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
      name: "Intercor Taubaté",
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
      name: "Intercor RBF Unifesp",
      city: "São Paulo",
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
    },
    { 
      id: 4, 
      text: "Fui doador pela primeira vez e a equipe me deixou tão à vontade que vou voltar!", 
      author: "Rafael, primeiro doador" 
    }
  ];

  // Conteúdo das abas
  const tabContents = {
    'Salva vidas': 'Cada doação de sangue pode ajudar a salvar várias vidas, já que o sangue doado é separado em componentes – Concentrado de Hemácias (CH), Concentrado de Plaquetas (CP), Plasma Fresco Congelado (PFC) e Crioprecipitado (CRIO) – que podem ser utilizados em diferentes tratamentos.',
    'Estoque seguro': 'A doação de sangue regular é essencial para manter os estoques nos hemocentros em níveis seguros.',
    'Ato de cidadania': 'A doação é um ato altruísta, que ajuda pessoas desconhecidas. A maioria das doações é voluntária e, por isso, são seguras e feitas sem nenhum interesse financeiro.',
    'Evitar desabastecimento': 'A doação de sangue regular é essencial para manter os estoques nos hemocentros para os atendimentos de sangramentos agudos em casos de urgências e emergências, realização de cirurgias de grande porte e tratamentos de doenças crônicas que frequentemente demandam transfusões sanguíneas; e também na produção de medicamentos essenciais derivados do plasma.'
  };

  // Controle do carrossel automático
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => 
        prev === testimonials.length - 1 ? 0 : prev + 1
      );
    }, 5000);
    
    return () => clearInterval(interval);
  }, [testimonials.length]);

  // Efeito de scroll para navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleNavigation = (path) => {
    navigate(path);
    setMenuOpen(false);
    window.scrollTo(0, 0);
  };

  const handleScheduleAtLocation = (centerId) => {
    navigate(`/agendar/${centerId}`);
  };

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => 
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => 
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  const goToTestimonial = (index) => {
    setCurrentTestimonial(index);
  };

  return (
    <div className="home-container">
      {/* Menu Superior Fixo */}
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="navbar-logo" onClick={() => handleNavigation('/')}>
          <DoePlusLogo />
        </div>
        
        {/* Hamburger Icon */}
        <div className="hamburger" onClick={toggleMenu}>
          <div className={`hamburger-line ${menuOpen ? 'open' : ''}`}></div>
          <div className={`hamburger-line ${menuOpen ? 'open' : ''}`}></div>
          <div className={`hamburger-line ${menuOpen ? 'open' : ''}`}></div>
        </div>
        
        <ul className={`navbar-menu ${menuOpen ? 'active' : ''}`}>
          <li className="menu-item active" onClick={() => handleNavigation('/home')}>Início</li>
          <li className="menu-item" onClick={() => handleNavigation('/agendar')}>Agendar Doação</li>
          <li className="menu-item" onClick={() => handleNavigation('/dashboard')}>Consultar Estoque</li>
          <li className="menu-item" onClick={() => handleNavigation('/sobre')}>Sobre nós</li>
          <li className="menu-item" onClick={() => handleNavigation('/contato')}>Contato</li>
          <li className="mobile-menu-item">
            <button className="profile-button mobile" onClick={() => handleNavigation('/perfil')}>
              <UserIcon size={16} color="#fff" />
              <span>Perfil</span>
            </button>
          </li>
        </ul>
        
        <button className="profile-button desktop" onClick={() => handleNavigation('/perfil')}>
          <UserIcon size={20} color="#E63946" />
        </button>
      </nav>

      <div className="main-content">
        {/* Banner Principal */}
        <section className="hero-banner">
          <div className="banner-content">
            <h1>Salve vidas com um gesto simples. Doe sangue.</h1>
            <p>No estado de São Paulo, sua doação faz a diferença entre milhares de pessoas.</p>
            <button 
              className="primary-button" 
              onClick={() => handleNavigation('/agendar')}
              aria-label="Agendar doação de sangue"
            >
              <CalendarIcon size={18} color="#E63946" />
              <span>Agendar Doação</span>
            </button>
          </div>
          <div className="banner-image">
            <img 
              src="/images/banner.jpg" 
              alt="Doação de sangue" 
              className="banner-img"
              loading="lazy"
            />
          </div>
        </section>

        {/* Seção Sobre Doação */}
        <section className="about-donation-section">
          <div className="about-donation-header">
            <h2>Sobre a Doação de Sangue</h2>
            <p>
              A doação de sangue é um ato de solidariedade e cidadania, que tem importância vital para a saúde pública. 
              A doação de sangue é 100% voluntária e beneficia qualquer pessoa. O sangue é essencial para os atendimentos 
              de urgência e emergências, realização de cirurgias e tratamentos de doenças crônicas.
            </p>
          </div>
          
          <div className="about-cards-container">
            <div className="about-card">
              <div className="about-icon heart">
                <HeartIcon size={80} />
              </div>
              <h3>Objetivo</h3>
              <p>
                Assegurar a disponibilidade de sangue e seus derivados, garantindo a manutenção dos estoques 
                seguros de sangue para atender às demandas do país e salvar vidas diariamente.
              </p>
              <p>
                Cada doação pode beneficiar até 4 pessoas, tornando esse ato um dos gestos mais poderosos de solidariedade.
              </p>
            </div>
            
            <div className="about-card">
              <div className="about-icon drop">
                <BloodDropIcon size={80} />
              </div>
              <h3>Metas e Benefícios</h3>
              <ul>
                <li>Conscientizar a população sobre a importância da doação regular</li>
                <li>Garantir a segurança e qualidade do sangue coletado</li>
                <li>Aumentar em 30% o número de doadores frequentes</li>
                <li>Reduzir o desperdício através de gestão eficiente</li>
                <li>Modernizar os centros de coleta em todo o estado</li>
                <li>Promover pesquisas para melhorar os processos</li>
                <li>Facilitar o agendamento através de plataformas digitais</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Nova Seção de Abas Interativas */}
        <section className="tabs-section">
          <div className="tabs-header">
            <ClickIcon size={24} color="#E63946" />
            <h2>Clique em cada exemplo e saiba a importância da doação de sangue:</h2>
          </div>
          
          <div className="tabs-container">
            <div className="tabs-buttons">
              {Object.keys(tabContents).map((tab) => (
                <button
                  key={tab}
                  className={`tab-button ${activeTab === tab ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>
            
            <div className="tab-content">
              <p>{tabContents[activeTab]}</p>
            </div>
          </div>
        </section>

        {/* Seção de Hemocentros */}
        <section className="blood-centers-section">
          <h2>Principais hemocentros no Vale do Paraíba</h2>
          <p>Conheça os principais centros de doação no Vale do Paraíba e seu estoque atual</p>
          
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
                        <span className="blood-type">
                          <BloodDropIcon size={14} color="#E63946" />
                          {type}
                        </span>
                        <div className={`stock-level ${level.toLowerCase()}`}>
                          <div className="level-bar"></div>
                          <span className="level-text">{level}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <button 
                  className="secondary-button" 
                  onClick={() => handleScheduleAtLocation(center.id)}
                  aria-label={`Agendar doação no ${center.name}`}
                >
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
            {testimonials.map((testimonial, index) => (
              <div 
                key={testimonial.id} 
                className={`testimonial-card ${index === currentTestimonial ? 'active' : ''}`}
                style={{ 
                  transform: `translateX(calc(-${currentTestimonial * 100}% - ${currentTestimonial * 2}rem))`,
                  opacity: index === currentTestimonial ? 1 : 0.7
                }}
              >
                <HeartIcon size={24} color="#E63946" />
                <p className="testimonial-text">"{testimonial.text}"</p>
                <p className="testimonial-author">- {testimonial.author}</p>
              </div>
            ))}
          </div>
          
          <div className="carousel-controls">
            <button 
              onClick={prevTestimonial} 
              className="carousel-arrow"
              aria-label="Depoimento anterior"
            >
              &#10094;
            </button>
            
            <div className="carousel-dots">
              {testimonials.map((_, index) => (
                <span 
                  key={index} 
                  className={`carousel-dot ${index === currentTestimonial ? 'active' : ''}`}
                  onClick={() => goToTestimonial(index)}
                  aria-label={`Ir para depoimento ${index + 1}`}
                />
              ))}
            </div>
            
            <button 
              onClick={nextTestimonial} 
              className="carousel-arrow"
              aria-label="Próximo depoimento"
            >
              &#10095;
            </button>
          </div>
        </section>
      </div>

      {/* Rodapé */}
      <footer className="site-footer">
        <div className="footer-content">
          <div className="footer-brand">
            <DoePlusLogo onClick={() => handleNavigation('/')} style={{cursor: 'pointer'}} />
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
    </div>
  );
};

export default HomeScreen;