import { db, pool } from '../db.js';

export const getUsers = (_, res) => {
    const q = "SELECT * FROM usuarios";

    db.query(q, (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data);
    });
};

// Novo: Verificar se usuário existe por email ou CPF
export const checkUser = (req, res) => {
    const { email, cpf } = req.query;
    const q = "SELECT id FROM usuarios WHERE email = ? OR cpf = ? LIMIT 1";

    db.query(q, [email, cpf], (err, data) => {
        if (err) return res.status(500).json(err);
        
        return res.status(200).json({
            exists: data.length > 0,
            id: data.length > 0 ? data[0].id : null
        });
    });
};

// Novo: Criar usuário para agendamento
export const createUserForAppointment = (req, res) => {
    const { nome, email, fone, data_nascimento } = req.body;
    const q = "INSERT INTO usuarios (nome, email, fone, data_nascimento) VALUES (?, ?, ?, ?)";

    db.query(q, [nome, email, fone, data_nascimento], (err, result) => {
        if (err) return res.status(500).json(err);
        return res.status(201).json({ id: result.insertId });
    });
};