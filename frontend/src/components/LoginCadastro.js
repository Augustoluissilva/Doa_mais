import React, { useState } from "react";
import { FaFacebookF, FaGoogle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./LoginCadastro.css"; // Certifique-se de que o CSS está linkado corretamente

const LoginPage = () => {
  const [isMoveOverlay, setIsMoveOverlay] = useState(false);
  const navigate = useNavigate();

  // Estados para o formulário de login
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [isLoginLoading, setIsLoginLoading] = useState(false);

  // Estados para o formulário de cadastro
  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPhone, setRegisterPhone] = useState("");
  const [registerCpf, setRegisterCpf] = useState("");
  const [registerBirthDate, setRegisterBirthDate] = useState("");
  const [registerGender, setRegisterGender] = useState(""); // NOVO ESTADO PARA GÊNERO
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState("");
  const [isRegisterLoading, setIsRegisterLoading] = useState(false);

  const moveOverlay = () => {
    setIsMoveOverlay(!isMoveOverlay);
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setIsLoginLoading(true);

    try {
      const response = await fetch("http://localhost:3001/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: loginEmail,
          password: loginPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Armazenar token ou informações do usuário se o backend retornar
        // Ex: localStorage.setItem('token', data.token);
        // Ex: localStorage.setItem('userId', data.userId);
        navigate("/Home"); // Redireciona para a tela inicial após login
      } else {
        alert(
          "Erro ao fazer login: " + (data.message || "Credenciais inválidas")
        );
      }
    } catch (error) {
      console.error("Erro de conexão ou requisição:", error); // Log mais detalhado
      alert(
        "Erro ao conectar com o servidor. Por favor, tente novamente mais tarde."
      );
    } finally {
      setIsLoginLoading(false);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();

    // Validações básicas no frontend
    if (registerPassword !== registerConfirmPassword) {
      alert("As senhas não coincidem!");
      return;
    }
    if (registerCpf.replace(/\D/g, "").length !== 11) {
      alert("Por favor, insira um CPF válido com 11 dígitos.");
      return;
    }
    if (registerPhone.replace(/\D/g, "").length < 10) {
      // Ex: (XX) XXXX-XXXX ou (XX) XXXXX-XXXX
      alert(
        "Por favor, insira um telefone válido com pelo menos 10 dígitos (com DDD)."
      );
      return;
    }
    // Adicionar validação de data de nascimento se necessário (ex: maior de 18)

    setIsRegisterLoading(true);

    try {
      const response = await fetch("http://localhost:3001/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: registerName,
          email: registerEmail,
          fone: registerPhone.replace(/\D/g, ""), // Envia apenas dígitos
          cpf: registerCpf.replace(/\D/g, ""), // Envia apenas dígitos
          data_nascimento: registerBirthDate,
          genero: registerGender, // NOVO CAMPO: gênero
          senha: registerPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Cadastro bem-sucedido!");
        // Limpa o formulário e volta para o login
        setRegisterName("");
        setRegisterEmail("");
        setRegisterPhone("");
        setRegisterCpf("");
        setRegisterBirthDate("");
        setRegisterGender(""); // Limpar gênero
        setRegisterPassword("");
        setRegisterConfirmPassword("");
        setIsMoveOverlay(false); // Volta para o painel de login
      } else {
        alert(
          "Erro ao cadastrar: " +
            (data.message || "Ocorreu um erro no cadastro.")
        );
      }
    } catch (error) {
      console.error("Erro de conexão ou requisição:", error); // Log mais detalhado
      alert(
        "Erro ao conectar com a API. Por favor, tente novamente mais tarde."
      );
    } finally {
      setIsRegisterLoading(false);
    }
  };

  // Função para formatar CPF (melhorada para aceitar apenas dígitos e formatar)
  const formatCpf = (value) => {
    const cleaned = value.replace(/\D/g, ""); // Remove tudo que não é dígito
    let formatted = cleaned;

    if (cleaned.length > 3) {
      formatted = `${cleaned.slice(0, 3)}.${cleaned.slice(3)}`;
    }
    if (cleaned.length > 6) {
      formatted = `${formatted.slice(0, 7)}.${cleaned.slice(6)}`; // Corrigido aqui para aplicar a formatação corretamente
    }
    if (cleaned.length > 9) {
      formatted = `${formatted.slice(0, 11)}-${cleaned.slice(9)}`; // Corrigido aqui
    }

    return formatted.slice(0, 14); // Limita ao tamanho máximo de um CPF formatado
  };

  const handleCpfChange = (e) => {
    const formattedCpf = formatCpf(e.target.value);
    setRegisterCpf(formattedCpf);
  };

  // Função para formatar Telefone (opcional, mas boa prática)
  const formatPhone = (value) => {
    const cleaned = value.replace(/\D/g, "");
    let formatted = cleaned;

    if (cleaned.length > 0) {
      formatted = `(${cleaned.substring(0, 2)}`;
    }
    if (cleaned.length > 2) {
      formatted += `) ${cleaned.substring(2, 7)}`;
    }
    if (cleaned.length > 7) {
      formatted += `-${cleaned.substring(7, 11)}`;
    }
    return formatted.slice(0, 15); // Ex: (99) 99999-9999
  };

  const handlePhoneChange = (e) => {
    const formattedPhone = formatPhone(e.target.value);
    setRegisterPhone(formattedPhone);
  };

  return (
    <main>
      <div
        className={`login-container ${isMoveOverlay ? "move" : ""}`}
        id="login-container"
      >
        <div className="form-container">
          {/* Formulário de Login */}
          <form
            className="form form-login"
            id="login-form"
            onSubmit={handleLoginSubmit}
          >
            <h2 className="form-title">Entrar com</h2>
            <div className="form-social">
              <a
                href="#"
                className="social-icon"
                aria-label="Entrar com Facebook"
              >
                <FaFacebookF />
              </a>
              <a
                href="#"
                className="social-icon"
                aria-label="Entrar com Google"
              >
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
            <a href="#" className="form-link">
              Esqueceu a senha?
            </a>
            <button
              type="submit"
              className="form-button"
              disabled={isLoginLoading}
            >
              {isLoginLoading ? "Carregando..." : "Entrar"}
            </button>
            <p className="mobile-text">
              Não tem conta?
              <a href="#" id="open-register-mobile" onClick={moveOverlay}>
                Registre-se
              </a>
            </p>
          </form>

          {/* Formulário de Cadastro */}
          <form
            className="form form-register"
            id="register-form"
            onSubmit={handleRegisterSubmit}
          >
            <h2 className="form-title">Criar Conta</h2>
            <div className="form-social">
              <a
                href="#"
                className="social-icon"
                aria-label="Cadastrar com Facebook"
              >
                <FaFacebookF />
              </a>
              <a
                href="#"
                className="social-icon"
                aria-label="Cadastrar com Google"
              >
                <FaGoogle />
              </a>
            </div>
            <p className="form-text">ou cadastre seu email</p>
            <div className="form-input-container register-inputs">
              <input
                type="text"
                className="form-input"
                placeholder="Nome Completo" // Melhorar placeholder
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
                type="tel" // Usar type="tel" para telefones
                className="form-input"
                placeholder="Telefone (DDD) XXXXX-XXXX" // Melhorar placeholder
                value={registerPhone}
                onChange={handlePhoneChange} // Usar a função de formatação
                maxLength="15" // Máximo para (99) 99999-9999
                required
              />
              <input
                type="text"
                className="form-input"
                placeholder="CPF"
                value={registerCpf}
                onChange={handleCpfChange}
                maxLength="14" // Para CPF formatado (000.000.000-00)
                required
              />
              <input
                type="date"
                className="form-input"
                value={registerBirthDate}
                onChange={(e) => setRegisterBirthDate(e.target.value)}
                required
              />
              {/* NOVO CAMPO: Seleção de Gênero */}
              <select
                className="form-input"
                value={registerGender}
                onChange={(e) => setRegisterGender(e.target.value)}
                required // Gênero é NOT NULL no banco
              >
                <option value="">Selecione o Gênero</option>
                <option value="feminino">Feminino</option>
                <option value="masculino">Masculino</option>
                <option value="outro">Outro</option>
                <option value="nao_informar">Prefiro não informar</option>
              </select>

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
              {isRegisterLoading ? "Carregando..." : "Cadastrar"}
            </button>
            <p className="mobile-text">
              Já tem conta?
              <a href="#" id="open-login-mobile" onClick={moveOverlay}>
                Entrar
              </a>
            </p>
          </form>
        </div>

        {/* Painel direito */}
        <div className="overlay-container">
          <div className="overlay">
            <h2 className="form-title form-title-light">Já tem conta?</h2>
            <p className="form-text form-text-light">
              Para se manter conectado conosco por gentileza logue com suas
              informações pessoais
            </p>
            <button
              className="form-button form-button-light"
              id="open-login"
              onClick={moveOverlay}
            >
              Entrar
            </button>
          </div>
          <div className="overlay">
            <h2 className="form-title form-title-light">Olá, Amigo(a)!</h2>
            <p className="form-text form-text-light">
              Entre com suas informações e comece sua jornada conosco
            </p>
            <button
              className="form-button form-button-light"
              id="open-register"
              onClick={moveOverlay}
            >
              Cadastrar
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
