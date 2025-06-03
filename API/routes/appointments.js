import express from 'express';
import { createAppointment } from '../controllers/Appointment.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    console.log("Dados recebidos no backend:", req.body);
    
    // Processar agendamento
    await createAppointment(req, res);
  } catch (error) {
    console.error("Erro no route handler:", error);
    res.status(500).json({ 
      success: false,
      message: "Erro interno no servidor",
      error: error.message
    });
  }
});

export default router;