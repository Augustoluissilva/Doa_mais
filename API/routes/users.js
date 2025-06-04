import express from 'express';
import { getUsers, checkUser, createUserForAppointment } from '../controllers/user.js';
import bcrypt from 'bcrypt';
import pool from '../db.js'; // Importando a conexão com o banco de dados

const router = express.Router();

router.get('/', getUsers);
router.get('/check', checkUser);
router.post('/for-appointment', createUserForAppointment);

// Rota para Cadastro
router.post('/register', async (req, res) => {
    const { nome, email, fone, cpf, data_nascimento, senha } = req.body;

    if (!nome || !email || !fone || !cpf || !data_nascimento || !senha) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
    }

    try {
        // Verifica se o CPF já está cadastrado
        const [cpfCheck] = await pool.query('SELECT * FROM usuarios WHERE cpf = ?', [cpf]);
        if (cpfCheck.length > 0) {
            return res.status(400).json({ message: 'CPF já cadastrado' });
        }

        // Verifica se o email já está cadastrado
        const [emailCheck] = await pool.query('SELECT * FROM usuarios WHERE email = ?', [email]);
        if (emailCheck.length > 0) {
            return res.status(400).json({ message: 'Email já cadastrado' });
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(senha, saltRounds);
        
        const [result] = await pool.query(
            'INSERT INTO usuarios (nome, email, fone, cpf, data_nascimento, senha) VALUES (?, ?, ?, ?, ?, ?)',
            [nome, email, fone, cpf, data_nascimento, hashedPassword]
        );
        
        return res.status(201).json({ 
            message: 'Usuário cadastrado com sucesso', 
            userId: result.insertId 
        });
    } catch (error) {
        console.error('Erro ao cadastrar usuário:', error);
        return res.status(500).json({ 
            message: 'Erro ao cadastrar usuário', 
            error: error.message 
        });
    }
});

// Rota para Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email e senha são obrigatórios' });
    }

    try {
        const [results] = await pool.query('SELECT * FROM usuarios WHERE email = ?', [email]);
        
        if (results.length === 0) {
            return res.status(401).json({ message: 'Usuário não encontrado' });
        }

        const user = results[0];
        const match = await bcrypt.compare(password, user.senha);
        
        if (!match) {
            return res.status(401).json({ message: 'Senha inválida' });
        }

        // Remove a senha do objeto user antes de enviar a resposta
        const { senha: _, ...userWithoutPassword } = user;

        return res.status(200).json({ 
            message: 'Login bem-sucedido', 
            user: userWithoutPassword
        });
    } catch (error) {
        console.error('Erro ao fazer login:', error);
        return res.status(500).json({ 
            message: 'Erro ao fazer login', 
            error: error.message 
        });
    }
});

export default router;