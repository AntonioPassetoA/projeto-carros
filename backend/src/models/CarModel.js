
const pool = require('../config/db');

class CarModel {
    static async getAll() {
        const [rows] = await pool.query("SELECT * FROM cars");
        return rows;
    }
    static async insert({ marca, modelo, ano }) {
        await pool.query("INSERT INTO cars (marca, modelo, ano) VALUES (?, ?, ?)", [marca, modelo, ano]);
    }
}

module.exports = CarModel;
