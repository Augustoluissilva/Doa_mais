import mysql from "mysql2/promise";

const pool = mysql.createPool({
	connectionLimit: 10,
	host: "localhost",
	user: "root",
	password: "",
	database: "db_doa+",
	waitForConnections: true,
	queueLimit: 0,
});

// Teste de conexão
pool.getConnection()
	.then((connection) => {
		console.log("Conectado ao MySQL como ID", connection.threadId);
		connection.release();
	})
	.catch((err) => {
		console.error("Erro ao conectar ao MySQL:", err.message);
	});

export default pool;
