import React, { useState, useEffect } from "react";
import { FaFacebookF, FaGoogle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import api from "../api";
import "./LoginCadastro.css";

const LoginPage = () => {
	const navigate = useNavigate();

	// Overlay
	const [isMoveOverlay, setIsMoveOverlay] = useState(false);

	// Estados de Login
	const [loginEmail, setLoginEmail] = useState("");
	const [loginPassword, setLoginPassword] = useState("");
	const [isLoginLoading, setIsLoginLoading] = useState(false);

	// Estados de Cadastro
	const [registerName, setRegisterName] = useState("");
	const [registerEmail, setRegisterEmail] = useState("");
	const [registerPhone, setRegisterPhone] = useState("");
	const [registerCpf, setRegisterCpf] = useState("");
	const [registerBirthDate, setRegisterBirthDate] = useState("");
	const [registerGender, setRegisterGender] = useState("");
	const [registerPassword, setRegisterPassword] = useState("");
	const [registerConfirmPassword, setRegisterConfirmPassword] = useState("");
	const [isRegisterLoading, setIsRegisterLoading] = useState(false);

	// Ao montar, caso já exista token salva, adiciona no header default
	useEffect(() => {
		const token = localStorage.getItem("token");
		if (token) {
			api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
		}
	}, []);

	const moveOverlay = () => setIsMoveOverlay(!isMoveOverlay);

	// ========================= LOGIN =========================
	const handleLoginSubmit = async (e) => {
		e.preventDefault();
		setIsLoginLoading(true);

		try {
			const { data } = await api.post("/users/login", {
				email: loginEmail,
				senha: loginPassword,
			});

			// Supondo que data.token seja retornado pelo backend
			localStorage.setItem("token", data.token);
			api.defaults.headers.common[
				"Authorization"
			] = `Bearer ${data.token}`;

			navigate("/Home");
		} catch (error) {
			console.error("Erro ao fazer login:", error);
			const message =
				error.response?.data?.message ||
				"Credenciais inválidas ou erro de servidor.";
			alert(`Erro ao fazer login: ${message}`);
		} finally {
			setIsLoginLoading(false);
		}
	};

	// ========================= CADASTRO =========================
	const handleRegisterSubmit = async (e) => {
		e.preventDefault();

		if (registerPassword !== registerConfirmPassword) {
			return alert("As senhas não coincidem!");
		}
		if (registerCpf.replace(/\D/g, "").length !== 11) {
			return alert("CPF deve conter 11 dígitos.");
		}
		if (registerPhone.replace(/\D/g, "").length < 10) {
			return alert(
				"Telefone deve conter DDD + número (mínimo 10 dígitos)."
			);
		}

		setIsRegisterLoading(true);

		try {
			await api.post("/users/register", {
				nome: registerName,
				email: registerEmail,
				fone: registerPhone.replace(/\D/g, ""),
				cpf: registerCpf.replace(/\D/g, ""),
				data_nascimento: registerBirthDate,
				genero: registerGender,
				senha: registerPassword,
			});

			alert("Cadastro realizado com sucesso! Faça login para continuar.");
			resetRegisterForm();
			setIsMoveOverlay(false); // volta para o painel de login
		} catch (error) {
			console.error("Erro ao cadastrar:", error);
			const message =
				error.response?.data?.message || "Erro ao cadastrar usuário.";
			alert(`Erro: ${message}`);
		} finally {
			setIsRegisterLoading(false);
		}
	};

	// ========================= HELPERS =========================
	const resetRegisterForm = () => {
		setRegisterName("");
		setRegisterEmail("");
		setRegisterPhone("");
		setRegisterCpf("");
		setRegisterBirthDate("");
		setRegisterGender("");
		setRegisterPassword("");
		setRegisterConfirmPassword("");
	};

	const formatCpf = (value) => {
		const cleaned = value.replace(/\D/g, "");
		let formatted = cleaned;
		if (cleaned.length > 3)
			formatted = `${cleaned.slice(0, 3)}.${cleaned.slice(3)}`;
		if (cleaned.length > 6)
			formatted = `${formatted.slice(0, 7)}.${cleaned.slice(6)}`;
		if (cleaned.length > 9)
			formatted = `${formatted.slice(0, 11)}-${cleaned.slice(9)}`;
		return formatted.slice(0, 14);
	};

	const handleCpfChange = (e) => setRegisterCpf(formatCpf(e.target.value));

	const formatPhone = (value) => {
		const cleaned = value.replace(/\D/g, "");
		let formatted = cleaned;
		if (cleaned.length > 0) formatted = `(${cleaned.substring(0, 2)}`;
		if (cleaned.length > 2) formatted += `) ${cleaned.substring(2, 7)}`;
		if (cleaned.length > 7) formatted += `-${cleaned.substring(7, 11)}`;
		return formatted.slice(0, 15);
	};

	const handlePhoneChange = (e) =>
		setRegisterPhone(formatPhone(e.target.value));

	// ========================= JSX =========================
	return (
		<main>
			<div
				className={`login-container ${isMoveOverlay ? "move" : ""}`}
				id="login-container"
			>
				{/* Forms */}
				<div className="form-container">
					{/* LOGIN FORM */}
					<form
						className="form form-login"
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
								onChange={(e) =>
									setLoginPassword(e.target.value)
								}
								required
							/>
						</div>
						<a href="./EsqueceuSenha.js" className="form-link">
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
							<a href="#" onClick={moveOverlay}>
								Registre-se
							</a>
						</p>
					</form>

					{/* REGISTER FORM */}
					<form
						className="form form-register"
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
								placeholder="Nome Completo"
								value={registerName}
								onChange={(e) =>
									setRegisterName(e.target.value)
								}
								required
							/>
							<input
								type="email"
								className="form-input"
								placeholder="Email"
								value={registerEmail}
								onChange={(e) =>
									setRegisterEmail(e.target.value)
								}
								required
							/>
							<input
								type="tel"
								className="form-input"
								placeholder="Telefone (DDD) XXXXX-XXXX"
								value={registerPhone}
								onChange={handlePhoneChange}
								maxLength="15"
								required
							/>
							<input
								type="text"
								className="form-input"
								placeholder="CPF"
								value={registerCpf}
								onChange={handleCpfChange}
								maxLength="14"
								required
							/>
							<input
								type="date"
								className="form-input"
								value={registerBirthDate}
								onChange={(e) =>
									setRegisterBirthDate(e.target.value)
								}
								required
							/>
							<select
								className="form-input"
								value={registerGender}
								onChange={(e) =>
									setRegisterGender(e.target.value)
								}
								required
							>
								<option value="">Selecione o Gênero</option>
								<option value="feminino">Feminino</option>
								<option value="masculino">Masculino</option>
								<option value="outro">Outro</option>
								<option value="nao_informar">
									Prefiro não informar
								</option>
							</select>
							<input
								type="password"
								className="form-input"
								placeholder="Senha"
								value={registerPassword}
								onChange={(e) =>
									setRegisterPassword(e.target.value)
								}
								required
							/>
							<input
								type="password"
								className="form-input"
								placeholder="Confirme sua senha"
								value={registerConfirmPassword}
								onChange={(e) =>
									setRegisterConfirmPassword(e.target.value)
								}
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
							<a href="#" onClick={moveOverlay}>
								Entrar
							</a>
						</p>
					</form>
				</div>

				{/* Painel direito */}
				<div className="overlay-container">
					<div className="overlay">
						<h2 className="form-title form-title-light">
							Já tem conta?
						</h2>
						<p className="form-text form-text-light">
							Para se manter conectado conosco, faça login com
							suas informações pessoais
						</p>
						<button
							className="form-button form-button-light"
							onClick={moveOverlay}
						>
							Entrar
						</button>
					</div>
					<div className="overlay">
						<h2 className="form-title form-title-light">
							Olá, Amigo(a)!
						</h2>
						<p className="form-text form-text-light">
							Insira seus dados e comece sua jornada conosco
						</p>
						<button
							className="form-button form-button-light"
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
