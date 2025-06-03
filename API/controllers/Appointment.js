export const createAppointment = async (req, res) => {
  const {
    nome, email, telefone, cpf, data_nascimento,
    genero, tipo_sanguineo, peso, altura,
    cep, endereco, numero, complemento, cidade, estado,
    data_doacao, horario, hemocentro,
    doou_recentemente, possui_doencas, medicamentos, restricoes_alimentares
  } = req.body;

  try {
    // 1. Verificar/Criar usuário
    const [user] = await db.query(
      'SELECT id FROM usuarios WHERE email = ? OR cpf = ? LIMIT 1', 
      [email, cpf]
    );

    let usuario_id;
    if (user.length > 0) {
      usuario_id = user[0].id;
    } else {
      const [result] = await db.query(
        'INSERT INTO usuarios (nome, email, fone, data_nascimento, cpf) VALUES (?, ?, ?, ?, ?)',
        [nome, email, telefone, data_nascimento, cpf]
      );
      usuario_id = result.insertId;
    }

    // 2. Criar agendamento
    const [appointment] = await db.query(
      `INSERT INTO agendamentos (
        usuario_id, cpf, genero, tipo_sanguineo, peso, altura,
        cep, endereco, numero, complemento, cidade, estado,
        data_doacao, horario, hemocentro, doou_recentemente,
        possui_doencas, medicamentos, restricoes_alimentares
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        usuario_id, cpf, genero, tipo_sanguineo, peso, altura,
        cep, endereco, numero, complemento, cidade, estado,
        data_doacao, horario, hemocentro, doou_recentemente,
        possui_doencas, medicamentos, restricoes_alimentares
      ]
    );

    res.status(201).json({
      success: true,
      appointmentId: appointment.insertId,
      userId: usuario_id
    });

  } catch (error) {
    console.error("Erro no controller:", error);
    throw error; // Será capturado pelo route handler
  }
};