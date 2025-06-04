import pool from "../db.js";

export const createAppointment = async (req, res) => {
  console.log("Dados recebidos para agendamento:", req.body);

  const {
    genero,
    tipo_sanguineo,
    peso,
    altura,
    cep,
    endereco,
    numero,
    complemento,
    cidade,
    estado,
    data_doacao,
    horario,
    hemocentro,
    doou_recentemente = false,
    possui_doencas = false,
    medicamentos = "Nenhum",
    restricoes_alimentares = "Nenhuma",
    status = "pendente",
  } = req.body;

  const usuario_id = req.user.id;
  // Captura automática do ID do usuário autenticado

  if (!usuario_id) {
    return res.status(401).json({
      success: false,
      message: "Usuário não autenticado",
    });
  }

  const [userCheck] = await pool.query("SELECT id FROM usuarios WHERE id = ?", [
    usuario_id,
  ]);
  if (userCheck.length === 0) {
    return res.status(404).json({
      success: false,
      message: "Usuário não encontrado",
    });
  }

  // Validação dos campos obrigatórios
  const requiredFields = {
    genero: "Gênero",
    tipo_sanguineo: "Tipo sanguíneo",
    peso: "Peso",
    altura: "Altura",
    cep: "CEP",
    endereco: "Endereço",
    numero: "Número",
    cidade: "Cidade",
    estado: "Estado",
    data_doacao: "Data da doação",
    horario: "Horário",
    hemocentro: "Hemocentro",
  };

  const missingFields = Object.entries(requiredFields)
    .filter(
      ([field]) =>
        req.body[field] === undefined ||
        req.body[field] === null ||
        req.body[field] === ""
    )
    .map(([_, name]) => name);

  if (missingFields.length > 0) {
    return res.status(400).json({
      success: false,
      message: "Campos obrigatórios não fornecidos",
      missingFields: missingFields.join(", "),
    });
  }

  try {
    // Verifica se o usuário existe
    const [userCheck] = await pool.query(
      "SELECT id FROM usuarios WHERE id = ?",
      [usuario_id]
    );
    if (userCheck.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Usuário não encontrado",
      });
    }

    // Converte booleanos para tinyint (MySQL)
    const doouRecentementeInt = doou_recentemente ? 1 : 0;
    const possuiDoencasInt = possui_doencas ? 1 : 0;

    const [result] = await pool.query(
      `INSERT INTO agendamentos (
                usuario_id, genero, tipo_sanguineo, peso, altura,
                cep, endereco, numero, complemento, cidade, estado,
                data_doacao, horario, hemocentro, doou_recentemente,
                possui_doencas, medicamentos, restricoes_alimentares, status,
                criado_em, atualizado_em
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
      [
        usuario_id,
        genero,
        tipo_sanguineo,
        peso,
        altura,
        cep,
        endereco,
        numero,
        complemento || null,
        cidade,
        estado,
        data_doacao,
        horario,
        hemocentro,
        doouRecentementeInt,
        possuiDoencasInt,
        medicamentos,
        restricoes_alimentares,
        status,
      ]
    );

    // Busca os dados do agendamento criado
    const [appointment] = await pool.query(
      "SELECT * FROM agendamentos WHERE id = ?",
      [result.insertId]
    );

    return res.status(201).json({
      success: true,
      message: "Agendamento criado com sucesso",
      data: appointment[0],
    });
  } catch (error) {
    console.error("Erro ao criar agendamento:", error);

    if (error.code === "ER_DUP_ENTRY") {
      return res.status(409).json({
        success: false,
        message: "Conflito: Este horário já está agendado",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Erro ao processar agendamento",
      error: error.message,
      details:
        process.env.NODE_ENV === "development"
          ? {
              sql: error.sql,
              stack: error.stack,
            }
          : undefined,
    });
  }
};
