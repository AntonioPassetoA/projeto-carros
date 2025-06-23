
const pool = require('../config/db');

class UserModel {
    static async findByUsername(username) {
        const [rows] = await pool.query("SELECT * FROM users WHERE username = ?", [username]);
        return rows[0];
    }
}

module.exports = UserModel;
