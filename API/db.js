import mysql from "mysql";

export const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "AGluis25$",
    database: "db_Doa+",
});

// Adicione tratamento de erro na conexão
db.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err.stack);
        return;
    }
    console.log('Conectado ao banco de dados como ID', db.threadId);
});

// Exporte também um pool de conexões para melhor performance
export const pool = mysql.createPool({
    connectionLimit: 10,
    host: "localhost",
    user: "root",
    password: "AGluis25$",
    database: "db_Doa+",
});