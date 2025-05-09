import express from 'express';
import cors from 'cors';
import userRoutes from './routes/users.js';

const app = express();

// Configura o CORS para permitir requisições do frontend
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

// Usa as rotas de usuários
app.use('/users', userRoutes);

app.listen(3001, () => {
  console.log('API rodando na porta 3001');
});