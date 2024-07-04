const pool = require('../db');

class Journal {
    static async create(userId, title, content, category) {
        const result = await pool.query(
            'INSERT INTO journals (user_id, title, content, category) VALUES ($1, $2, $3, $4) RETURNING *',
            [userId, title, content, category]
        );
        return result.rows[0];
    }

    static async findByUserId(userId) {
        const result = await pool.query('SELECT * FROM journals WHERE user_id = $1', [userId]);
        return result.rows;
    }

    static async update(id, title, content, category) {
        const result = await pool.query(
            'UPDATE journals SET title = $1, content = $2, category = $3 WHERE id = $4 RETURNING *',
            [title, content, category, id]
        );
        return result.rows[0];
    }

    static async delete(id) {
        await pool.query('DELETE FROM journals WHERE id = $1', [id]);
    }
}

module.exports = Journal;
