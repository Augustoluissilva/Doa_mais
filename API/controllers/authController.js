import pool from "../db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
	const { email, senha } = req.body;

	try {
		const [users] = await pool.query(
			"SELECT * FROM usuarios WHERE email = ?",
			[email]
		);

		if (users.length === 0) {
			// Mensagem genérica para evitar dar pista sobre usuário inexistente
			return res.status(401).json({ message: "Credenciais inválidas" });
		}

		const user = users[0];
		const senhaValida = await bcrypt.compare(senha, user.senha);

		if (!senhaValida) {
			// Mesma mensagem genérica para senha incorreta
			return res.status(401).json({ message: "Credenciais inválidas" });
		}

		if (!process.env.JWT_SECRET) {
			return res
				.status(500)
				.json({ message: "Erro interno: JWT_SECRET não configurado" });
		}

		// Token com payload mínimo (id do usuário)
		const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
			expiresIn: "1h",
		});

		return res.status(200).json({ token });
	} catch (err) {
		return res
			.status(500)
			.json({ message: "Erro no login", error: err.message });
	}
};
