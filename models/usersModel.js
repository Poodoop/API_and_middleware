const pool = require('../config/queries.js');

class UsersModel {
    static async login(email, password) {
        try {
            const results = await pool.query(
                'SELECT * FROM users WHERE email = $1 AND password = $2',
                [email, password]
            );
            return results.rows[0];
        } catch (error) {
            throw error;
        }
    }

    static async register(id, email, gender, role, password) {
        try {
            const results = await pool.query(
                'INSERT INTO users (id, email, gender, role, password) VALUES ($1, $2, $3, $4, $5) RETURNING *',
                [id, email, gender, role, password]
            );
            return results.rows[0];
        } catch (error) {
            throw error;
        }
    }

    static async getUsers(limit, page) {
        try {
            const startIndex = (page - 1) * limit;
            const results = await pool.query(
                'SELECT id, email, gender, role, password FROM users OFFSET $1 LIMIT $2',
                [startIndex, limit]
            );
            return results.rows;
        } catch (error) {
            throw error;
        }
    }

    static async deleteUser(userId) {
        try {
            await pool.query('DELETE FROM users WHERE id = $1', [userId]);
        } catch (error) {
            throw error;
        }
    }

    static async updateUser(userId, newPassword) {
        try {
            await pool.query('UPDATE users SET password = $1 WHERE id = $2', [newPassword, userId]);
        } catch (error) {
            throw error;
        }
    }
}

module.exports = UsersModel;