import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaMapMarkerAlt, FaNewspaper, FaHeartbeat } from 'react-icons/fa';
import './LandingPage.css';

function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    // Verifica se o Leaflet está disponível
    if (typeof window.L === 'undefined') {
      console.error('Leaflet não foi carregado corretamente');
      return;
    }

    // Inicializa o mapa
    const map = window.L.map('map-container').setView([-23.1791, -45.8872], 12);

    // Adiciona o tile layer do OpenStreetMap
    window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Configuração do ícone personalizado
    const customIcon = new window.L.Icon({
      iconUrl: 'https://unpkg.com/leaflet/dist/images/marker-icon.png',
      iconRetinaUrl: 'https://unpkg.com/leaflet/dist/images/marker-icon-2x.png',
      shadowUrl: 'https://unpkg.com/leaflet/dist/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });

    // Hemocentros no Vale do Paraíba
    const hemocentros = [
      { name: 'Hemocentro São José dos Campos', lat: -23.1894, lng: -45.8843 },
      { name: 'Hemocentro Taubaté', lat: -23.0264, lng: -45.5553 },
      { name: 'Hemocentro Jacareí', lat: -23.3053, lng: -45.9658 },
      { name: 'Hemocentro Guaratinguetá', lat: -22.8167, lng: -45.2278 },
      { name: 'Hemocentro Pindamonhangaba', lat: -22.9236, lng: -45.4617 }
    ];

    // Adiciona marcadores para cada hemocentro
    hemocentros.forEach(hemocentro => {
      window.L.marker([hemocentro.lat, hemocentro.lng], { icon: customIcon })
        .addTo(map)
        .bindPopup(`<b>${hemocentro.name}</b><br><a href="https://www.google.com/maps?q=${hemocentro.lat},${hemocentro.lng}" target="_blank" rel="noopener noreferrer">Ver rotas</a>`);
    });

    return () => {
      map.remove();
    };
  }, []);

  const findNearestCenter = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLat = position.coords.latitude;
          const userLng = position.coords.longitude;
          
          // Rolagem suave até o mapa
          document.getElementById('map-container').scrollIntoView({ behavior: 'smooth' });
          
          alert(`Sua localização: ${userLat}, ${userLng}\nMostrando hemocentros próximos...`);
        },
        (error) => {
          console.error("Erro ao obter localização:", error);
          alert("Não foi possível obter sua localização. Mostrando hemocentros no Vale do Paraíba.");
        }
      );
    } else {
      alert("Geolocalização não suportada pelo navegador. Mostrando hemocentros no Vale do Paraíba.");
    }
  };

  return (
    <div className="home-container">
      {/* Navbar */}
      <nav className="simple-navbar">
        <div className="navbar-content">
          <div className="navbar-logo-container">
            <img src="/images/doa+02.png" alt="DOA+" className="navbar-logo" />
          </div>
          <div className="navbar-links">
            <a href="#inicio">Inicio</a>
            <a href="#hemocentros">Hemocentros</a>
            <a href="#noticias">Noticias</a>
            <a href="#contato">Contato</a>
            <button className="nav-login-btn" onClick={() => navigate('/LoginCadastro')}>Entrar</button>
            <button className="nav-logout-btn" onClick={() => navigate('/logout')}>Sair</button>
          </div>
        </div>
      </nav>

      {/* Header */}
      <header className="app-header">
        
      </header>

      {/* Hero Section */}
      <section className="hero-section" id="inicio">
        <div className="hero-content">
          <h1>Doe sangue, salve vidas</h1>
          <p className="hero-subtitle">
            A cada doação, até quatro pessoas podem ter uma nova chance. Seja a esperança de alguém hoje.
          </p>
          <div className="cta-buttons">
            <button className="accent-btn">
              Veja se pode doar
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about-section">
        <div className="section-header">
          <FaHeartbeat className="section-icon" />
          <h2>Sobre nós</h2>
        </div>
        <p>
          A DOA+ é uma plataforma digital criada para aumentar o número de doações de sangue no Brasil. 
          Conectamos doadores a hemocentros de forma eficiente, rápida e engajadora.
        </p>
        <p>
          Nosso objetivo é aumentar o número de doações por meio de uma plataforma que fornece 
          informações em tempo real sobre estoques e engaja doadores regulares.
        </p>
      </section>

      {/* Centers Section */}
      <section className="centers-section" id="hemocentros">
        <div className="section-header">
          <FaMapMarkerAlt className="section-icon" />
          <h2>Hemocentros no Vale do Paraíba</h2>
        </div>
        <div id="map-container" style={{ height: "500px", width: "100%", borderRadius: "8px" }}></div>
        <button className="find-center-btn" onClick={findNearestCenter}>
          Encontrar hemocentro mais próximo
        </button>
      </section>

      {/* News Section */}
      <section className="news-section" id="noticias">
        <div className="section-header">
          <FaNewspaper className="section-icon" />
          <h2>Notícias</h2>
        </div>
        <div className="news-cards">
          {[1, 2, 3].map((item) => (
            <div key={item} className="news-card">
              <div className="news-image-placeholder"></div>
              <p className="news-excerpt">
                Lorem ipsum dolor sit amet. Ei est consequent et aperitum qual i ut repellendus enum.
              </p>
              <a href="#" className="read-more">Ler mais</a>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="app-footer" id="contato">
        <div className="alert-section">
          <h3>Fique atento</h3>
          <p>Cadastre-se para receber alertas sobre estoques de sangue</p>
          <form className="alert-form">
            <input type="text" placeholder="Seu nome" required />
            <input type="email" placeholder="Seu email" required />
            <button type="submit" className="submit-btn">
              Cadastrar
            </button>
          </form>
        </div>
        
        <div className="contact-info">
          <p><strong>DOA+</strong> - Plataforma de Doação de Sangue</p>
          <div className="contact-links">
            <a href="mailto:dos+project@gmail.com">dos+project@gmail.com</a>
            <a href="tel:+550999999999">+55 (0) 99999-9999</a>
          </div>
          <p className="copyright">© {new Date().getFullYear()} DOA+ Todos os direitos reservados</p>
        </div>
      </footer>
    </div>
  );
}

export default Home;