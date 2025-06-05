import express from "express";
import { createAppointment } from "../controllers/Appointment.js";
import { verifyToken } from "../middlewares/authMiddleware.js"; // 🔧 ajuste conforme o nome real do seu arquivo

const router = express.Router();

router.post("/", verifyToken, createAppointment);

router.get("/", (req, res) => {
	res.status(200).json({
		status: "ok",
		message: "GET appointments funcionando",
	});
});

export default router;
