import express from 'express';
import cors from 'cors';
import pool from './db.js';
import userRoutes from './routes/users.js';
import appointmentRoutes from './routes/appointments.js';
import authRoutes from './routes/auth.js';

const app = express();

// Configuração do CORS
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

// Middlewares
app.use('/auth', authRoutes);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//DEFININDO ROTA RAIZ
app.get('/', (req, res) => {
    res.status(200).json({ 
        status: 'ok',
        message: 'Bem-vindo à API!'
    });
});

// Rotas
app.use('/users', userRoutes);
app.use('/appointments', appointmentRoutes);

// Rota de saúde
app.get('/health', async (req, res) => {
    try {
        await pool.query('SELECT 1');
        res.status(200).json({ 
            status: 'ok',
            message: 'API e banco de dados operacionais',
            timestamp: new Date().toISOString()
        });
    } catch (err) {
        res.status(500).json({ 
            status: 'error',
            message: 'Falha na conexão com o banco de dados',
            error: err.message
        });
    }
});

// Rota não encontrada
app.use((req, res) => {
    res.status(404).json({ 
        status: 'error',
        message: 'Endpoint não encontrado'
    });
});

// Manipulador de erros
app.use((err, req, res, next) => {
    console.error('Erro:', err.stack);
    res.status(500).json({ 
        status: 'error',
        message: 'Erro interno no servidor',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

// Configuração da porta
const PORT = process.env.PORT || 3001;

// Inicia o servidor
const server = app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

// Encerramento gracioso
const shutdown = async () => {
    console.log('Encerrando servidor...');
    await pool.end();
    server.close(() => {
        console.log('Servidor encerrado');
        process.exit(0);
    });
};

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);