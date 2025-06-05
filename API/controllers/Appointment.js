import pool from "../db.js";

// Criação de agendamento
export const createAppointment = async (req, res) => {
	console.log("Recebido:", req.body);

	const usuario_id = req.user?.id;

	if (!usuario_id) {
		return res.status(401).json({
			success: false,
			message: "Usuário não autenticado.",
		});
	}

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

	// Validação de campos obrigatórios
	const required = {
		genero,
		tipo_sanguineo,
		peso,
		altura,
		cep,
		endereco,
		numero,
		cidade,
		estado,
		data_doacao,
		horario,
		hemocentro,
	};

	const missing = Object.entries(required)
		.filter(([_, v]) => !v)
		.map(([k]) => k);

	if (missing.length > 0) {
		return res.status(400).json({
			success: false,
			message: "Campos obrigatórios ausentes.",
			missingFields: missing,
		});
	}

	try {
		// Confirma existência do usuário
		const [users] = await pool.query(
			"SELECT id FROM usuarios WHERE id = ?",
			[usuario_id]
		);
		if (users.length === 0) {
			return res
				.status(404)
				.json({ success: false, message: "Usuário não encontrado." });
		}

		// Insere agendamento
		const [result] = await pool.query(
			`
      INSERT INTO agendamentos (
        usuario_id, genero, tipo_sanguineo, peso, altura,
        cep, endereco, numero, complemento, cidade, estado,
        data_doacao, horario, hemocentro, doou_recentemente,
        possui_doencas, medicamentos, restricoes_alimentares, status,
        criado_em, atualizado_em
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())
    `,
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
				doou_recentemente ? 1 : 0,
				possui_doencas ? 1 : 0,
				medicamentos,
				restricoes_alimentares,
				status,
			]
		);

		const [appointment] = await pool.query(
			"SELECT * FROM agendamentos WHERE id = ?",
			[result.insertId]
		);

		return res.status(201).json({
			success: true,
			message: "Agendamento criado com sucesso.",
			data: appointment[0],
		});
	} catch (error) {
		console.error("Erro ao criar agendamento:", error);

		return res.status(500).json({
			success: false,
			message: "Erro interno ao processar o agendamento.",
			error:
				process.env.NODE_ENV === "development"
					? error.message
					: undefined,
		});
	}
};
