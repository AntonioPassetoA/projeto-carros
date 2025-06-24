
const pool = require('../config/db');

class CarModel {
    static async getAll() {
        const [rows] = await pool.query("SELECT * FROM cars");
        return rows;
    }
    static async insert({ marca, modelo, ano }) {
        await pool.query("INSERT INTO cars (marca, modelo, ano) VALUES (?, ?, ?)", [marca, modelo, ano]);
    }
    static async delete(id) {
        await pool.query("DELETE FROM cars WHERE id = ?", [id]);
    }
    static async update(id, { marca, modelo, ano }) {
        await pool.query("UPDATE cars SET marca = ?, modelo = ?, ano = ? WHERE id = ?", [marca, modelo, ano, id]);
    }
}

module.exports = CarModel;
