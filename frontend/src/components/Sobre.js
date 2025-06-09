import React from 'react';
import { FaInstagram, FaLinkedin } from 'react-icons/fa';
import Navbar from './Navbar';
import Footer from './Footer';
import './Sobre.css';

const teamMembers = [
  {
    nome: "Luis Augusto",
    funcao: "Desenvolvedor FullStack",
    bio: "Responsável pelo desenvolvimento completo do sistema, integrando frontend e backend.",
    imagem: "/images/luis.jpg",
    redes: {
      instagram: "https://www.instagram.com/luissanntos_/",
      linkedin: "https://www.linkedin.com/in/luis-augusto-38980a26b/"
    }
  },
  {
    nome: "Luis Otavio",
    funcao: "Desenvolvedor Frontend e Designer UX/UI",
    bio: "Responsável pela implementação da interface e experiência do usuário, e responsável pelo design da interface e experiência do usuário.",
    imagem: "/images/luisotavio.jpg",
    redes: {
      instagram: "https://www.instagram.com/luiszotavioo/profilecard/?igsh=cGhiYW9wNzAxMTh1",
      linkedin: "https://www.linkedin.com/in/luisotvio9?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app"
    }
  },
  {
    nome: "Yasmin Lobo",
    funcao: "Desenvolvedora FullStack",
    bio: "Responsável pelo desenvolvimento completo do sistema, integrando frontend e backend.",
    imagem: "/images/yasmin.jpg",
    redes: {
      instagram: "https://www.instagram.com/yasminsloboo?igsh=MXNzbXQzaDhoMjVibg%3D%3D&utm_source=qr",
      linkedin: "https://www.linkedin.com/in/yasminslobo?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app"
    }
  }
];

const AboutPage = () => {
  return (
    <div className="sobre-page">
      <Navbar />
      
      <div className="sobre-content">
        <section className="about-section">
          <h2 className="about-section-title">O Projeto</h2>
          <p>
            O projeto Doa Mais nasceu com o objetivo de conscientizar a população do Vale do Paraíba sobre a importância da doação de sangue.
          </p>
          <p>
            Apesar de haver apenas dois hemocentros ativos na região, a demanda por sangue é constante e há uma preocupante escassez de doadores.
          </p>
          <p>
            O sistema visa informar, engajar e facilitar o acesso às informações sobre doação de sangue, promovendo o bem-estar social por meio de tecnologia e empatia.
          </p>
        </section>

        <section className="about-section">
          <h2 className="about-section-title">Sobre o Doa Mais</h2>
          <div className="about-highlight-text">
            O Doa Mais é um projeto desenvolvido em React JS no frontend e Node.js com MySQL Workbench no backend, com o propósito de unir tecnologia e solidariedade em prol da vida.
          </div>
        </section>

        <section className="about-section">
          <h2 className="about-section-title">Time de Desenvolvedores</h2>
          <div className="about-team-grid">
            {teamMembers.map((member, index) => (
              <div className="about-team-card" key={index}>
                <img src={member.imagem} alt={member.nome} className="about-member-image" />
                <h3 className="about-member-name">{member.nome}</h3>
                <p className="about-member-role">{member.funcao}</p>
                <p className="about-member-bio">{member.bio}</p>
                <div className="about-social-links">
                  <a href={member.redes.instagram} target="_blank" rel="noopener noreferrer">
                    <FaInstagram />
                  </a>
                  <a href={member.redes.linkedin} target="_blank" rel="noopener noreferrer">
                    <FaLinkedin />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default AboutPage;