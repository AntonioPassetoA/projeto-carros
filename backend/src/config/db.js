
const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || '',
    database: process.env.DB_NAME || 'carrosdb',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Criação da tabela e usuário admin na primeira execução
async function setup() {
    const conn = await pool.getConnection();
    await conn.query(`
        CREATE TABLE IF NOT EXISTS users (
            id INT PRIMARY KEY AUTO_INCREMENT,
            username VARCHAR(50) UNIQUE,
            password VARCHAR(200)
        );
    `);
    await conn.query(`
        CREATE TABLE IF NOT EXISTS cars (
            id INT PRIMARY KEY AUTO_INCREMENT,
            marca VARCHAR(100),
            modelo VARCHAR(100),
            ano INT
        );
    `);
    // Adiciona usuário admin se não existir
    const [rows] = await conn.query("SELECT * FROM users WHERE username = 'admin'");
    if (rows.length === 0) {
        const bcrypt = require('bcrypt');
        const hash = await bcrypt.hash('123456', 10);
        await conn.query("INSERT INTO users (username, password) VALUES (?, ?)", ['admin', hash]);
    }
    conn.release();
}
setup();

module.exports = pool;
