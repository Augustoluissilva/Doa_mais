import express from 'express';
import cors from 'cors';
import userRoutes from './routes/users.js';
import appointmentRoutes from './routes/appointments.js';
import { db } from './db.js';

const app = express();

// Configuração do CORS
const corsOptions = {
  origin: 'http://localhost:3000', // Permite apenas requisições do frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
  allowedHeaders: ['Content-Type', 'Authorization'], // Cabeçalhos permitidos
  credentials: true // Permite envio de credenciais (cookies, tokens)
};

app.use(cors(corsOptions));

// Middlewares
app.use(express.json()); // Para parsing de application/json
app.use(express.urlencoded({ extended: true })); // Para parsing de application/x-www-form-urlencoded

// Rotas
app.use('/users', userRoutes);
app.use('/appointments', appointmentRoutes);

// Rota de saúde da API
app.get('/health', (req, res) => {
  // Verifica a conexão com o banco de dados
  db.ping((err) => {
    if (err) {
      return res.status(500).json({ 
        status: 'error',
        message: 'Database connection failed',
        error: err.message
      });
    }
    res.status(200).json({ 
      status: 'ok',
      message: 'API is running and connected to database',
      timestamp: new Date().toISOString()
    });
  });
});

// Rota não encontrada (404)
app.use((req, res, next) => {
  res.status(404).json({ 
    status: 'error',
    message: 'Endpoint not found'
  });
});

// Manipulador de erros global
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).json({ 
    status: 'error',
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Configuração da porta
const PORT = process.env.PORT || 3001;

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

// Manipulador para encerramento gracioso
process.on('SIGINT', () => {
  db.end((err) => {
    if (err) {
      console.error('Error closing database connection:', err);
      process.exit(1);
    }
    console.log('Database connection closed');
    process.exit(0);
  });
});