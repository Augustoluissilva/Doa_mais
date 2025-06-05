import pool from "../db.js";
import bcrypt from "bcrypt";

export const getUsers = async (_, res) => {
	try {
		const [data] = await pool.query(
			"SELECT id, nome, email, fone, cpf, data_nascimento FROM usuarios"
		);
		// Nunca retorne senha!
		return res.status(200).json(data);
	} catch (err) {
		return res
			.status(500)
			.json({ message: "Erro ao buscar usuários", error: err.message });
	}
};

export const checkUser = async (req, res) => {
	try {
		const { email, cpf } = req.query;

		if (!email && !cpf) {
			return res
				.status(400)
				.json({ message: "Informe email ou cpf para verificação" });
		}

		const [data] = await pool.query(
			"SELECT id FROM usuarios WHERE email = ? OR cpf = ? LIMIT 1",
			[email || "", cpf || ""]
		);

		return res.status(200).json({
			exists: data.length > 0,
			id: data.length > 0 ? data[0].id : null,
		});
	} catch (err) {
		return res.status(500).json({
			message: "Erro na verificação do usuário",
			error: err.message,
		});
	}
};

export const createUserForAppointment = async (req, res) => {
	try {
		const { nome, email, fone, data_nascimento } = req.body;

		if (!nome || !email || !fone || !data_nascimento) {
			return res.status(400).json({
				message: "Todos os campos são obrigatórios para o agendamento",
			});
		}

		const [result] = await pool.query(
			"INSERT INTO usuarios (nome, email, fone, data_nascimento) VALUES (?, ?, ?, ?)",
			[nome, email, fone, data_nascimento]
		);

		return res.status(201).json({ id: result.insertId });
	} catch (err) {
		return res.status(500).json({
			message: "Erro ao criar usuário para agendamento",
			error: err.message,
		});
	}
};
