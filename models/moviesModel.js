const pool = require('../config/queries.js');

class MoviesModel {
    static async getMovies(limit, page) {
        try {
            const startIndex = (page - 1) * limit;
            const results = await pool.query(
                'SELECT * FROM movies OFFSET $1 LIMIT $2',
                [startIndex, limit]
            );
            return results.rows;
        } catch (error) {
            throw error;
        }
    }

    static async createMovie(title, genres, year) {
        try {
            await pool.query(
                'INSERT INTO movies ("title", "genres", "year") VALUES ($1, $2, $3)',
                [title, genres, year]
            );
        } catch (error) {
            throw error;
        }
    }

    static async deleteMovie(movieId) {
        try {
            await pool.query('DELETE FROM movies WHERE id = $1', [movieId]);
        } catch (error) {
            throw error;
        }
    }

    static async updateMovie(movieId, year) {
        try {
            await pool.query('UPDATE movies SET year = $1 WHERE id = $2', [year, movieId]);
        } catch (error) {
            throw error;
        }
    }

    static async uploadImage(movieId, filePath) {
        try {
            await pool.query('UPDATE movies SET images = $1 WHERE id = $2', [filePath, movieId]);
        } catch (error) {
            throw error;
        }
    }
}

module.exports = MoviesModel;