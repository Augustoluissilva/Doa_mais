import express from "express";
import {
	getUsers,
	checkUser,
	createUserForAppointment,
} from "../controllers/user.js";
import { verifyToken } from "../middlewares/authMiddleware.js"; // ajuste o caminho se necessário
import pool from "../db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();

router.get("/", verifyToken, getUsers);
router.get("/check", checkUser);
router.post("/for-appointment", createUserForAppointment);

// Rota para cadastro de usuário (com senha e validação)
router.post("/register", async (req, res) => {
	const { nome, email, fone, cpf, data_nascimento, senha } = req.body;

	if (!nome || !email || !fone || !cpf || !data_nascimento || !senha) {
		return res
			.status(400)
			.json({ message: "Todos os campos são obrigatórios" });
	}

	try {
		// Verifica se CPF já está cadastrado
		const [cpfCheck] = await pool.query(
			"SELECT id FROM usuarios WHERE cpf = ?",
			[cpf]
		);
		if (cpfCheck.length > 0) {
			return res.status(400).json({ message: "CPF já cadastrado" });
		}

		// Verifica se email já está cadastrado
		const [emailCheck] = await pool.query(
			"SELECT id FROM usuarios WHERE email = ?",
			[email]
		);
		if (emailCheck.length > 0) {
			return res.status(400).json({ message: "Email já cadastrado" });
		}

		const saltRounds = 10;
		const hashedPassword = await bcrypt.hash(senha, saltRounds);

		const [result] = await pool.query(
			"INSERT INTO usuarios (nome, email, fone, cpf, data_nascimento, senha) VALUES (?, ?, ?, ?, ?, ?)",
			[nome, email, fone, cpf, data_nascimento, hashedPassword]
		);

		return res.status(201).json({
			message: "Usuário cadastrado com sucesso",
			userId: result.insertId,
		});
	} catch (error) {
		console.error("Erro ao cadastrar usuário:", error);
		return res.status(500).json({
			message: "Erro ao cadastrar usuário",
			error: error.message,
		});
	}
});

router.post("/login", async (req, res) => {
	const { email, senha } = req.body;

	if (!email || !senha) {
		return res
			.status(400)
			.json({ message: "Email e senha são obrigatórios" });
	}

	try {
		const [results] = await pool.query(
			"SELECT * FROM usuarios WHERE email = ?",
			[email]
		);

		if (results.length === 0) {
			return res
				.status(401)
				.json({ message: "Email ou senha inválidos" });
		}

		const user = results[0];

		console.log("Hash no banco:", user.senha); // para confirmar hash armazenado

		const senhaValida = await bcrypt.compare(senha, user.senha);

		console.log("Senha válida?", senhaValida);

		if (!senhaValida) {
			return res
				.status(401)
				.json({ message: "Email ou senha inválidos" });
		}
		// Gerar token JWT
		const token = jwt.sign(
			{ id: user.id, email: user.email },
			process.env.JWT_SECRET,
			{ expiresIn: "1h" }
		);

		// Retornar token e dados para frontend
		return res.status(200).json({
			message: "Login realizado com sucesso",
			token,
			user: {
				id: user.id,
				nome: user.nome,
				email: user.email,
			},
		});
	} catch (error) {
		console.error("Erro ao fazer login:", error);
		res.status(500).json({ message: "Erro interno", error: error.message });
	}
});

export default router;
