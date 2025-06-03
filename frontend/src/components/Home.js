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

const HomeScreen = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
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
          <li className="menu-item active" onClick={() => handleNavigation('/')}>Início</li>
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

        {/* Seção de Exemplos */}
        <section className="examples-section">
          <h2>Clique em cada exemplo e saiba a importância da doação de sangue:</h2>
          <div className="examples-grid">
            <div 
              className="example-card" 
              onClick={() => handleNavigation('/importancia/emergencia')}
              role="button"
              tabIndex="0"
            >
              <h4>Situação de emergência</h4>
              <p>Casos de acidentes com grandes perdas de sangue</p>
            </div>
            <div 
              className="example-card"
              onClick={() => handleNavigation('/importancia/doencas-cronicas')}
              role="button"
              tabIndex="0"
            >
              <h4>Doenças crônicas</h4>
              <p>Pacientes que necessitam de transfusões regulares</p>
            </div>
            <div 
              className="example-card"
              onClick={() => handleNavigation('/importancia/cirurgias')}
              role="button"
              tabIndex="0"
            >
              <h4>Cirurgias complexas</h4>
              <p>Procedimentos que podem requerer reserva de sangue</p>
            </div>
            <div 
              className="example-card"
              onClick={() => handleNavigation('/importancia/recem-nascidos')}
              role="button"
              tabIndex="0"
            >
              <h4>Recém-nascidos</h4>
              <p>Bebês prematuros que necessitam de cuidados especiais</p>
            </div>
          </div>
        </section>

        {/* Seção de Hemocentros */}
        <section className="blood-centers-section">
          <h2>Principais hemocentros no estado de São Paulo</h2>
          <p>Conheça os principais centros de doação no estado de São Paulo e seu estoque atual</p>
          
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
              <li onClick={() => handleNavigation('/')}>Início</li>
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