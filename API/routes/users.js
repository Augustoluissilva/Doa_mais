import express from 'express';
import { db } from '../db.js';
import bcrypt from 'bcrypt';

const router = express.Router();

// Rota para Cadastro
router.post('/register', async (req, res) => {
  const { nome, email, fone, data_nascimento, senha } = req.body;

  // Validação simples
  if (!nome || !email || !fone || !data_nascimento || !senha) {
    return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
  }

  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(senha, saltRounds);

    const query = 'INSERT INTO usuarios (nome, email, fone, data_nascimento, senha) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [nome, email, fone, data_nascimento, hashedPassword], (err, result) => {
      if (err) {
        console.error('Erro ao cadastrar usuário:', err);
        return res.status(500).json({ message: 'Erro ao cadastrar usuário', error: err.message });
      }
      res.status(201).json({ message: 'Usuário cadastrado com sucesso', userId: result.insertId });
    });
  } catch (error) {
    console.error('Erro ao criptografar senha:', error);
    return res.status(500).json({ message: 'Erro ao processar cadastro', error: error.message });
  }
});

// Rota para Login
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email e senha são obrigatórios' });
  }

  const query = 'SELECT * FROM usuarios WHERE email = ?';
  db.query(query, [email], async (err, results) => {
    if (err) {
      console.error('Erro ao fazer login:', err);
      return res.status(500).json({ message: 'Erro ao fazer login', error: err.message });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: 'Usuário não encontrado' });
    }

    const user = results[0];
    const match = await bcrypt.compare(password, user.senha);
    if (!match) {
      return res.status(401).json({ message: 'Senha inválida' });
    }

    res.status(200).json({ message: 'Login bem-sucedido', user });
  });
});

export default router;