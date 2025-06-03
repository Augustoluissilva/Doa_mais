import React, { useState } from 'react';
import axios from 'axios';
import './AgendamentoDoacao.css';

const AgendamentoDoacao = () => {
  const [formData, setFormData] = useState({
    nomeCompleto: '',
    cpf: '',
    dataNascimento: '',
    genero: '',
    tipoSanguineo: '',
    peso: '',
    altura: '',
    email: '',
    telefone: '',
    cep: '',
    endereco: '',
    numero: '',
    complemento: '',
    cidade: '',
    estado: '',
    dataDoacao: '',
    horario: '',
    hemocentro: '',
    doouRecentemente: false,
    possuiDoencas: false,
    medicamentos: '',
    restricoesAlimentares: '',
    aceitouTermos: false
  });

  const [etapa, setEtapa] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Formatadores
  const formatarCPF = (cpf) => {
    return cpf
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1');
  };

  const formatarTelefone = (telefone) => {
    return telefone
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{5})(\d)/, '$1-$2')
      .replace(/(-\d{4})\d+?$/, '$1');
  };

  const formatarCEP = (cep) => {
    return cep
      .replace(/\D/g, '')
      .replace(/(\d{5})(\d)/, '$1-$2')
      .replace(/(-\d{3})\d+?$/, '$1');
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.aceitouTermos) {
      setError('Você deve aceitar os termos e condições para continuar');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      console.log('Iniciando envio do agendamento...');
      
      const agendamentoData = {
        nome: formData.nomeCompleto,
        email: formData.email,
        telefone: formData.telefone.replace(/\D/g, ''),
        cpf: formData.cpf.replace(/\D/g, ''),
        data_nascimento: formData.dataNascimento,
        genero: formData.genero,
        tipo_sanguineo: formData.tipoSanguineo,
        peso: parseFloat(formData.peso),
        altura: parseInt(formData.altura),
        cep: formData.cep.replace(/\D/g, ''),
        endereco: formData.endereco,
        numero: formData.numero,
        complemento: formData.complemento,
        cidade: formData.cidade,
        estado: formData.estado,
        data_doacao: formData.dataDoacao,
        horario: formData.horario,
        hemocentro: formData.hemocentro,
        doou_recentemente: formData.doouRecentemente,
        possui_doencas: formData.possuiDoencas,
        medicamentos: formData.medicamentos,
        restricoes_alimentares: formData.restricoesAlimentares
      };

      console.log('Dados preparados para envio:', agendamentoData);

      const response = await axios.post('http://localhost:3001/appointments', agendamentoData);
      
      console.log('Resposta do servidor:', response.data);
      
      if (response.data.success) {
        setSubmitted(true);
      } else {
        throw new Error(response.data.message || 'Erro ao processar agendamento');
      }
    } catch (err) {
      console.error('Erro no agendamento:', err);
      console.error('Detalhes do erro:', err.response?.data);
      
      setError(err.response?.data?.message || 
               err.message || 
               'Erro ao enviar agendamento. Por favor, tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const proximaEtapa = () => {
    if (etapa === 1 && (
      !formData.nomeCompleto ||
      !formData.cpf ||
      !formData.dataNascimento ||
      !formData.genero ||
      !formData.tipoSanguineo ||
      !formData.peso ||
      !formData.altura ||
      !formData.email ||
      !formData.telefone
    )) {
      setError('Preencha todos os campos obrigatórios');
      return;
    }
    
    if (etapa === 2 && (
      !formData.cep ||
      !formData.endereco ||
      !formData.numero ||
      !formData.cidade ||
      !formData.estado
    )) {
      setError('Preencha todos os campos obrigatórios');
      return;
    }
    
    if (etapa === 3 && (
      !formData.dataDoacao ||
      !formData.horario ||
      !formData.hemocentro
    )) {
      setError('Preencha todos os campos obrigatórios');
      return;
    }

    setError(null);
    setEtapa(etapa + 1);
  };

  const etapaAnterior = () => setEtapa(etapa - 1);

  const estadosBrasileiros = [
    'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 
    'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 
    'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
  ];

  const tiposSanguineos = [
    'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'
  ];

  const hemocentros = [
    'Hemocentro São Paulo',
    'Hemorio - Rio de Janeiro',
    'Hemocentro Belo Horizonte',
    'Hemocentro Recife',
    'Hemocentro Porto Alegre',
    'Hemocentro Brasília',
    'Hemocentro Salvador',
    'Hemocentro Curitiba'
  ];

  if (loading) {
    return (
      <div className="agendamento-page">
        <nav className="navbar">
          <div className="navbar-logo">DDA3</div>
          <div className="navbar-links">
            <a href="/perfil" className="navbar-link">Perfil</a>
            <a href="/inicio" className="navbar-link">Inicio</a>
            <a href="/hemocentros" className="navbar-link">Hemocentros</a>
            <a href="/noticias" className="navbar-link">Noticias</a>
            <a href="/contato" className="navbar-link">Contato</a>
            <a href="/sair" className="navbar-link">Sair</a>
          </div>
        </nav>
        <div className="agendamento-container">
          <div className="agendamento-card">
            <h2>Processando seu agendamento...</h2>
            <div className="loading-spinner"></div>
            <p>Por favor, aguarde enquanto enviamos seus dados.</p>
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
  }

  if (error) {
    return (
      <div className="agendamento-page">
        <nav className="navbar">
          <div className="navbar-logo">DDA3</div>
          <div className="navbar-links">
            <a href="/perfil" className="navbar-link">Perfil</a>
            <a href="/inicio" className="navbar-link">Inicio</a>
            <a href="/hemocentros" className="navbar-link">Hemocentros</a>
            <a href="/noticias" className="navbar-link">Noticias</a>
            <a href="/contato" className="navbar-link">Contato</a>
            <a href="/sair" className="navbar-link">Sair</a>
          </div>
        </nav>
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
  }

  if (submitted) {
    return (
      <div className="agendamento-page">
        <nav className="navbar">
          <div className="navbar-logo">DDA3</div>
          <div className="navbar-links">
            <a href="/perfil" className="navbar-link">Perfil</a>
            <a href="/inicio" className="navbar-link">Inicio</a>
            <a href="/hemocentros" className="navbar-link">Hemocentros</a>
            <a href="/noticias" className="navbar-link">Noticias</a>
            <a href="/contato" className="navbar-link">Contato</a>
            <a href="/sair" className="navbar-link">Sair</a>
          </div>
        </nav>
        <div className="agendamento-container">
          <div className="agendamento-card sucesso">
            <h2>Agendamento realizado com sucesso!</h2>
            <p>Obrigado por agendar sua doação de sangue.</p>
            <p><strong>Data:</strong> {new Date(formData.dataDoacao).toLocaleDateString('pt-BR')} às {formData.horario}</p>
            <p><strong>Local:</strong> {formData.hemocentro}</p>
            <button 
              className="botao-primario"
              onClick={() => {
                setSubmitted(false);
                setFormData({
                  nomeCompleto: '',
                  cpf: '',
                  dataNascimento: '',
                  genero: '',
                  tipoSanguineo: '',
                  peso: '',
                  altura: '',
                  email: '',
                  telefone: '',
                  cep: '',
                  endereco: '',
                  numero: '',
                  complemento: '',
                  cidade: '',
                  estado: '',
                  dataDoacao: '',
                  horario: '',
                  hemocentro: '',
                  doouRecentemente: false,
                  possuiDoencas: false,
                  medicamentos: '',
                  restricoesAlimentares: '',
                  aceitouTermos: false
                });
                setEtapa(1);
              }}
            >
              Fazer novo agendamento
            </button>
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
  }

  return (
    <div className="agendamento-page">
      <nav className="navbar">
        <div className="navbar-logo">DDA3</div>
        <div className="navbar-links">
          <a href="/perfil" className="navbar-link">Perfil</a>
          <a href="/inicio" className="navbar-link">Inicio</a>
          <a href="/hemocentros" className="navbar-link">Hemocentros</a>
          <a href="/noticias" className="navbar-link">Noticias</a>
          <a href="/contato" className="navbar-link">Contato</a>
          <a href="/sair" className="navbar-link">Sair</a>
        </div>
      </nav>

      <div className="agendamento-container">
        <div className="agendamento-card">
          <h1>Agendar Doação de Sangue</h1>
          <p className="subtitulo">Preencha o formulário abaixo para agendar sua doação</p>
          
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
                    name="nomeCompleto" 
                    value={formData.nomeCompleto} 
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
                      const rawValue = e.target.value.replace(/\D/g, '');
                      if (rawValue.length <= 11) {
                        handleChange({
                          target: {
                            name: 'cpf',
                            value: rawValue
                          }
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
                    name="dataNascimento" 
                    value={formData.dataNascimento} 
                    onChange={handleChange} 
                    required 
                    max={new Date().toISOString().split('T')[0]}
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
                    name="tipoSanguineo" 
                    value={formData.tipoSanguineo} 
                    onChange={handleChange} 
                    required
                  >
                    <option value="">Selecione</option>
                    {tiposSanguineos.map(tipo => (
                      <option key={tipo} value={tipo}>{tipo}</option>
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
                      const rawValue = e.target.value.replace(/\D/g, '');
                      if (rawValue.length <= 11) {
                        handleChange({
                          target: {
                            name: 'telefone',
                            value: rawValue
                          }
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
                        const rawValue = e.target.value.replace(/\D/g, '');
                        if (rawValue.length <= 8) {
                          handleChange({
                            target: {
                              name: 'cep',
                              value: rawValue
                            }
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
                      {estadosBrasileiros.map(uf => (
                        <option key={uf} value={uf}>{uf}</option>
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
                      name="dataDoacao" 
                      value={formData.dataDoacao} 
                      onChange={handleChange} 
                      required 
                      min={new Date().toISOString().split('T')[0]}
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
                    {hemocentros.map(centro => (
                      <option key={centro} value={centro}>{centro}</option>
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
                      name="doouRecentemente" 
                      checked={formData.doouRecentemente} 
                      onChange={handleChange} 
                    />
                    Doou sangue nos últimos 3 meses?
                  </label>
                </div>
                
                <div className="form-group checkbox-group">
                  <label>
                    <input 
                      type="checkbox" 
                      name="possuiDoencas" 
                      checked={formData.possuiDoencas} 
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
                    name="restricoesAlimentares" 
                    value={formData.restricoesAlimentares} 
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
                      <li>Tenho entre 16 e 69 anos (menores de 18 precisam de autorização)</li>
                      <li>Peso mais de 50kg</li>
                      <li>Não estou em jejum</li>
                      <li>Não ingeri bebidas alcoólicas nas últimas 12 horas</li>
                      <li>Não fiz tatuagem ou piercing nos últimos 12 meses</li>
                    </ul>
                    <p>Estou ciente de que posso ser submetido(a) a testes para verificar minha aptidão para doação.</p>
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
            <div className={`progresso-item ${etapa >= 1 ? 'ativo' : ''}`}>1. Dados</div>
            <div className={`progresso-item ${etapa >= 2 ? 'ativo' : ''}`}>2. Endereço</div>
            <div className={`progresso-item ${etapa >= 3 ? 'ativo' : ''}`}>3. Agendamento</div>
            <div className={`progresso-item ${etapa >= 4 ? 'ativo' : ''}`}>4. Saúde</div>
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