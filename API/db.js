import mysql from "mysql";

export const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "AGluis25$",
    database: "db_Doa+",
});

