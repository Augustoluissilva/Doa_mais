import pool from '../db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const login = async (req, res) => {
  const { email, senha } = req.body;

  try {
    const [users] = await pool.query('SELECT * FROM usuarios WHERE email = ?', [email]);

    if (users.length === 0) {
      return res.status(401).json({ message: 'Usuário não encontrado' });
    }

    const user = users[0];
    const senhaValida = await bcrypt.compare(senha, user.senha);

    if (!senhaValida) {
      return res.status(401).json({ message: 'Senha inválida' });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: '1h'
    });

    return res.status(200).json({ token });
  } catch (err) {
    return res.status(500).json({ message: 'Erro no login', error: err.message });
  }
};
