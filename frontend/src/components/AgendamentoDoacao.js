import React, { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import "./AgendamentoDoacao.css";

const AgendamentoDoacao = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nome: "",
    cpf: "",
    data_nascimento: "",
    genero: "",
    tipo_sanguineo: "",
    peso: "",
    altura: "",
    email: "",
    telefone: "",
    cep: "",
    endereco: "",
    numero: "",
    complemento: "",
    cidade: "",
    estado: "",
    data_doacao: "",
    horario: "",
    hemocentro: "",
    doou_recentemente: false,
    possui_doencas: false,
    medicamentos: "",
    restricoes_alimentares: "",
    aceitouTermos: false,
  });

  const [etapa, setEtapa] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [appointmentId, setAppointmentId] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);

  // Formatadores
  const formatarCPF = (cpf) => {
    const cleaned = cpf.replace(/\D/g, "");
    let formatado = cleaned;

    if (cleaned.length > 3) {
      formatado = `${cleaned.slice(0, 3)}.${cleaned.slice(3)}`;
    }
    if (cleaned.length > 6) {
      formatado = `${formatado.slice(0, 7)}.${cleaned.slice(6)}`;
    }
    if (cleaned.length > 9) {
      formatado = `${formatado.slice(0, 11)}-${cleaned.slice(9)}`;
    }

    return formatado.slice(0, 14);
  };

  const formatarTelefone = (telefone) => {
    const ajustado = telefone.replace(/\D/g, "");
    let formatted = ajustado;

    if (ajustado.length > 0) {
      formatted = `(${ajustado.substring(0, 2)}`;
    }
    if (ajustado.length > 2) {
      formatted += `) ${ajustado.substring(2, 7)}`;
    }
    if (ajustado.length > 7) {
      formatted += `-${ajustado.substring(7, 11)}`;
    }
    return formatted.slice(0, 15);
  };

  const formatarCEP = (cep) => {
    return cep
      .replace(/\D/g, "")
      .replace(/(\d{5})(\d)/, "$1-$2")
      .replace(/(-\d{3})\d+?$/, "$1");
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.aceitouTermos) {
      setError("Você deve aceitar os termos e condições para continuar");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const agendamentoData = {
        nome: formData.nome,
        email: formData.email,
        telefone: formData.telefone.replace(/\D/g, ""),
        cpf: formData.cpf.replace(/\D/g, ""),
        data_nascimento: formData.data_nascimento,
        genero: formData.genero,
        tipo_sanguineo: formData.tipo_sanguineo,
        peso: parseFloat(formData.peso),
        altura: parseInt(formData.altura),
        cep: formData.cep.replace(/\D/g, ""),
        endereco: formData.endereco,
        numero: formData.numero,
        complemento: formData.complemento || null,
        cidade: formData.cidade,
        estado: formData.estado,
        data_doacao: formData.data_doacao,
        horario: formData.horario,
        hemocentro: formData.hemocentro,
        doou_recentemente: formData.doou_recentemente,
        possui_doencas: formData.possui_doencas,
        medicamentos: formData.medicamentos || null,
        restricoes_alimentares: formData.restricoes_alimentares || null,
      };

      const token = localStorage.getItem("token");
      if (!token) {
        setError("Usuário não autenticado. Faça login para continuar.");
        setLoading(false);
        return;
      }

      const response = await api.post("/appointments", agendamentoData);

      if (response.data.success) {
        setAppointmentId(response.data.data.id);
        setSubmitted(true);
      } else {
        throw new Error(
          response.data.message || "Erro ao processar agendamento"
        );
      }
    } catch (err) {
      let errorMessage =
        "Erro ao enviar agendamento. Por favor, tente novamente.";

      if (err.response) {
        if (err.response.status === 400) {
          errorMessage =
            err.response.data.message ||
            "Dados inválidos. Verifique os campos.";
        } else if (err.response.status === 500) {
          errorMessage =
            "Erro no servidor. Tente novamente mais tarde.";
        }
      } else if (err.message) {
        errorMessage = err.message;
      }

      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const validarEtapa = () => {
    switch (etapa) {
      case 1:
        if (
          !formData.nome ||
          !formData.cpf ||
          !formData.data_nascimento ||
          !formData.genero ||
          !formData.tipo_sanguineo ||
          !formData.peso ||
          !formData.altura ||
          !formData.email ||
          !formData.telefone
        ) {
          setError("Preencha todos os campos obrigatórios");
          return false;
        }
        if (formData.cpf.replace(/\D/g, "").length !== 11) {
          setError("CPF deve conter 11 dígitos");
          return false;
        }
        if (parseFloat(formData.peso) < 50) {
          setError("Peso mínimo para doação é 50kg");
          return false;
        }
        return true;

      case 2:
        if (
          !formData.cep ||
          !formData.endereco ||
          !formData.numero ||
          !formData.cidade ||
          !formData.estado
        ) {
          setError("Preencha todos os campos obrigatórios");
          return false;
        }
        return true;

      case 3:
        if (
          !formData.data_doacao ||
          !formData.horario ||
          !formData.hemocentro
        ) {
          setError("Preencha todos os campos obrigatórios");
          return false;
        }
        return true;

      default:
        return true;
    }
  };

  const proximaEtapa = () => {
    if (!validarEtapa()) return;
    setError(null);
    setEtapa(etapa + 1);
  };

  const etapaAnterior = () => {
    setError(null);
    setEtapa(etapa - 1);
  };

  const estadosBrasileiros = [
    "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", 
    "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", 
    "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"
  ];

  const tiposSanguineos = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  const hemocentros = [
    "Hemocentro São Paulo",
    "Hemorio - Rio de Janeiro",
    "Hemocentro Belo Horizonte",
    "Hemocentro Recife",
    "Hemocentro Porto Alegre",
    "Hemocentro Brasília",
    "Hemocentro Salvador",
    "Hemocentro Curitiba",
  ];

  if (loading) {
    return (
      <div className="agendamento-page">
        <Navbar isScrolled={isScrolled} />
        <div className="overlay">
          <div className="spinner"></div>
          <p>Processando seu agendamento...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="agendamento-page">
        <Navbar isScrolled={isScrolled} />
        <div className="agendamento-container">
          <div className="agendamento-card erro">
            <h2>Erro no Agendamento</h2>
            <p>{error}</p>
            <button
              className="botao-primario"
              onClick={() => setError(null)}
            >
              Tentar novamente
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="agendamento-page">
        <Navbar isScrolled={isScrolled} />
        <div className="agendamento-container">
          <div className="agendamento-card sucesso">
            <h2>Agendamento realizado com sucesso!</h2>
            <p>Número do agendamento: {appointmentId}</p>
            <p>Obrigado por agendar sua doação de sangue.</p>
            <p>
              <strong>Data:</strong>{" "}
              {new Date(formData.data_doacao).toLocaleDateString("pt-BR")} às{" "}
              {formData.horario}
            </p>
            <p>
              <strong>Local:</strong> {formData.hemocentro}
            </p>
            <div className="botoes-sucesso">
              <button
                className="botao-primario"
                onClick={() => {
                  setSubmitted(false);
                  setFormData({
                    nome: "",
                    cpf: "",
                    data_nascimento: "",
                    genero: "",
                    tipo_sanguineo: "",
                    peso: "",
                    altura: "",
                    email: "",
                    telefone: "",
                    cep: "",
                    endereco: "",
                    numero: "",
                    complemento: "",
                    cidade: "",
                    estado: "",
                    data_doacao: "",
                    horario: "",
                    hemocentro: "",
                    doou_recentemente: false,
                    possui_doencas: false,
                    medicamentos: "",
                    restricoes_alimentares: "",
                    aceitouTermos: false,
                  });
                  setEtapa(1);
                }}
              >
                Fazer novo agendamento
              </button>
              <button
                className="botao-secundario"
                onClick={() => navigate("/home")}
              >
                Voltar para Home
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="agendamento-page">
      <Navbar isScrolled={isScrolled} />

      <div className="agendamento-container">
        <div className="agendamento-card">
          <h1>Agendar Doação de Sangue</h1>
          <p className="subtitulo">
            Preencha o formulário abaixo para agendar sua doação
          </p>

          {error && <div className="mensagem-erro">{error}</div>}

          <form onSubmit={handleSubmit}>
            {/* Etapa 1: Dados Pessoais */}
            {etapa === 1 && (
              <div className="etapa">
                <h2>Dados Pessoais</h2>

                <div className="form-group">
                  <label>Nome Completo*</label>
                  <input
                    type="text"
                    name="nome"
                    value={formData.nome}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>CPF*</label>
                  <input
                    type="text"
                    name="cpf"
                    value={formatarCPF(formData.cpf)}
                    onChange={(e) => {
                      const rawValue = e.target.value.replace(/\D/g, "");
                      if (rawValue.length <= 11) {
                        handleChange({
                          target: {
                            name: "cpf",
                            value: rawValue,
                          },
                        });
                      }
                    }}
                    required
                    placeholder="000.000.000-00"
                  />
                </div>

                <div className="form-group">
                  <label>Data de Nascimento*</label>
                  <input
                    type="date"
                    name="data_nascimento"
                    value={formData.data_nascimento}
                    onChange={handleChange}
                    required
                    max={new Date().toISOString().split("T")[0]}
                  />
                </div>

                <div className="form-group">
                  <label>Gênero*</label>
                  <select
                    name="genero"
                    value={formData.genero}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Selecione</option>
                    <option value="feminino">Feminino</option>
                    <option value="masculino">Masculino</option>
                    <option value="outro">Outro</option>
                    <option value="nao_informar">Prefiro não informar</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Tipo Sanguíneo*</label>
                  <select
                    name="tipo_sanguineo"
                    value={formData.tipo_sanguineo}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Selecione</option>
                    {tiposSanguineos.map((tipo) => (
                      <option key={tipo} value={tipo}>
                        {tipo}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Peso (kg)*</label>
                    <input
                      type="number"
                      name="peso"
                      value={formData.peso}
                      onChange={handleChange}
                      required
                      min="50"
                      step="0.1"
                    />
                  </div>

                  <div className="form-group">
                    <label>Altura (cm)*</label>
                    <input
                      type="number"
                      name="altura"
                      value={formData.altura}
                      onChange={handleChange}
                      required
                      min="150"
                      max="220"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>E-mail*</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Telefone*</label>
                  <input
                    type="tel"
                    name="telefone"
                    value={formatarTelefone(formData.telefone)}
                    onChange={(e) => {
                      const rawValue = e.target.value.replace(/\D/g, "");
                      if (rawValue.length <= 11) {
                        handleChange({
                          target: {
                            name: "telefone",
                            value: rawValue,
                          },
                        });
                      }
                    }}
                    required
                    placeholder="(00) 00000-0000"
                  />
                </div>

                <div className="botoes-navegacao">
                  <button
                    type="button"
                    className="botao-primario"
                    onClick={proximaEtapa}
                  >
                    Próxima
                  </button>
                </div>
              </div>
            )}

            {/* Etapa 2: Endereço */}
            {etapa === 2 && (
              <div className="etapa">
                <h2>Endereço</h2>

                <div className="form-row">
                  <div className="form-group">
                    <label>CEP*</label>
                    <input
                      type="text"
                      name="cep"
                      value={formatarCEP(formData.cep)}
                      onChange={(e) => {
                        const rawValue = e.target.value.replace(/\D/g, "");
                        if (rawValue.length <= 8) {
                          handleChange({
                            target: {
                              name: "cep",
                              value: rawValue,
                            },
                          });
                        }
                      }}
                      required
                      placeholder="00000-000"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Endereço*</label>
                  <input
                    type="text"
                    name="endereco"
                    value={formData.endereco}
                    onChange={handleChange}
                    required
                    placeholder="Rua, Avenida, etc."
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Número*</label>
                    <input
                      type="text"
                      name="numero"
                      value={formData.numero}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Complemento</label>
                    <input
                      type="text"
                      name="complemento"
                      value={formData.complemento}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Cidade*</label>
                    <input
                      type="text"
                      name="cidade"
                      value={formData.cidade}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Estado*</label>
                    <select
                      name="estado"
                      value={formData.estado}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Selecione</option>
                      {estadosBrasileiros.map((uf) => (
                        <option key={uf} value={uf}>
                          {uf}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="botoes-navegacao">
                  <button
                    type="button"
                    className="botao-secundario"
                    onClick={etapaAnterior}
                  >
                    Voltar
                  </button>
                  <button
                    type="button"
                    className="botao-primario"
                    onClick={proximaEtapa}
                  >
                    Próxima
                  </button>
                </div>
              </div>
            )}

            {/* Etapa 3: Agendamento */}
            {etapa === 3 && (
              <div className="etapa">
                <h2>Agendamento</h2>

                <div className="form-row">
                  <div className="form-group">
                    <label>Data da Doação*</label>
                    <input
                      type="date"
                      name="data_doacao"
                      value={formData.data_doacao}
                      onChange={handleChange}
                      required
                      min={new Date().toISOString().split("T")[0]}
                    />
                  </div>

                  <div className="form-group">
                    <label>Horário*</label>
                    <input
                      type="time"
                      name="horario"
                      value={formData.horario}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Hemocentro*</label>
                  <select
                    name="hemocentro"
                    value={formData.hemocentro}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Selecione um hemocentro</option>
                    {hemocentros.map((centro) => (
                      <option key={centro} value={centro}>
                        {centro}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="botoes-navegacao">
                  <button
                    type="button"
                    className="botao-secundario"
                    onClick={etapaAnterior}
                  >
                    Voltar
                  </button>
                  <button
                    type="button"
                    className="botao-primario"
                    onClick={proximaEtapa}
                  >
                    Próxima
                  </button>
                </div>
              </div>
            )}

            {/* Etapa 4: Saúde */}
            {etapa === 4 && (
              <div className="etapa">
                <h2>Questionário de Saúde</h2>

                <div className="form-group checkbox-group">
                  <label>
                    <input
                      type="checkbox"
                      name="doou_recentemente"
                      checked={formData.doou_recentemente}
                      onChange={handleChange}
                    />
                    Doou sangue nos últimos 3 meses?
                  </label>
                </div>

                <div className="form-group checkbox-group">
                  <label>
                    <input
                      type="checkbox"
                      name="possui_doencas"
                      checked={formData.possui_doencas}
                      onChange={handleChange}
                    />
                    Possui doenças infectocontagiosas (HIV, hepatite, sífilis, etc.)?
                  </label>
                </div>

                <div className="form-group">
                  <label>Medicamentos em uso</label>
                  <textarea
                    name="medicamentos"
                    value={formData.medicamentos}
                    onChange={handleChange}
                    placeholder="Liste os medicamentos que está usando atualmente"
                  />
                </div>

                <div className="form-group">
                  <label>Restrições alimentares ou alergias</label>
                  <textarea
                    name="restricoes_alimentares"
                    value={formData.restricoes_alimentares}
                    onChange={handleChange}
                    placeholder="Informe se possui alguma restrição alimentar ou alergia"
                  />
                </div>

                <div className="termos-condicoes">
                  <h3>Termos e Condições</h3>
                  <div className="termos-texto">
                    <p>Ao agendar minha doação de sangue, declaro que:</p>
                    <ul>
                      <li>Estou em boas condições de saúde</li>
                      <li>
                        Tenho entre 16 e 69 anos (menores de 18 precisam de
                        autorização)
                      </li>
                      <li>Peso mais de 50kg</li>
                      <li>Não estou em jejum</li>
                      <li>
                        Não ingeri bebidas alcoólicas nas últimas 12 horas
                      </li>
                      <li>
                        Não fiz tatuagem ou piercing nos últimos 12 meses
                      </li>
                    </ul>
                    <p>
                      Estou ciente de que posso ser submetido(a) a testes para
                      verificar minha aptidão para doação.
                    </p>
                  </div>

                  <div className="form-group checkbox-group">
                    <label>
                      <input
                        type="checkbox"
                        name="aceitouTermos"
                        checked={formData.aceitouTermos}
                        onChange={handleChange}
                        required
                      />
                      Li e concordo com os termos e condições acima*
                    </label>
                  </div>
                </div>

                <div className="botoes-navegacao">
                  <button
                    type="button"
                    className="botao-secundario"
                    onClick={etapaAnterior}
                  >
                    Voltar
                  </button>
                  <button
                    type="submit"
                    className="botao-primario"
                  >
                    Confirmar Agendamento
                  </button>
                </div>
              </div>
            )}
          </form>

          <div className="progresso">
            <div className={`progresso-item ${etapa >= 1 ? "ativo" : ""}`}>
              1. Dados
            </div>
            <div className={`progresso-item ${etapa >= 2 ? "ativo" : ""}`}>
              2. Endereço
            </div>
            <div className={`progresso-item ${etapa >= 3 ? "ativo" : ""}`}>
              3. Agendamento
            </div>
            <div className={`progresso-item ${etapa >= 4 ? "ativo" : ""}`}>
              4. Saúde
            </div>
          </div>
        </div>
      </div>

      <footer className="footer">
        <div className="footer-content">
          <p>© 2023 DDA3 - Sistema de Doação de Sangue</p>
          <div className="footer-links">
            <a href="/termos">Termos de Uso</a>
            <a href="/privacidade">Política de Privacidade</a>
            <a href="/contato">Contato</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AgendamentoDoacao;