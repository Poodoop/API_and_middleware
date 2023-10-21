const { signToken, verifyToken } = require('../middleware/authMiddleware');
const moviesModel = require('../models/moviesModel');
const usersModel = require('../models/usersModel');

class Controller {
    static async getMovies(req, res) {
        try {
            const limit = parseInt(req.query.limit) || 10;
            const page = parseInt(req.query.page) || 1;
            const movies = await moviesModel.getMovies(limit, page);
            res.json(movies);
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    static async createMovie(req, res) {
        try {
            const { title, genres, year } = req.body;
            await moviesModel.createMovie(title, genres, year);
            res.status(201).json({ status: 'success' });
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    static async deleteMovie(req, res) {
        try {
            const movieId = req.params.id;
            await moviesModel.deleteMovie(movieId);
            res.status(201).json({ status: 'success' });
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    static async updateMovie(req, res) {
        try {
            const movieId = req.params.id;
            const { year } = req.body;
            await moviesModel.updateMovie(movieId, year);
            res.status(201).json({ status: 'success' });
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    static async uploadImage(req, res) {
        try {
            const file = req.file.path;
            const movieId = req.params.id;
            if (!file) {
                res.status(400).json({ status: false, data: 'No File is selected.' });
            } else {
                await moviesModel.uploadImage(movieId, file);
                res.status(201).json({ status: 'success' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    static async login(req, res) {
        try {
            const { email, password } = req.body;
            const user = await usersModel.login(email, password);
            if (user) {
                const token = signToken(user);
                res.json({ token });
            } else {
                res.status(401).json({ error: 'Unauthorized' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    static async register(req, res) {
        try {
            const { id, email, gender, role, password } = req.body;
            await usersModel.register(id, email, gender, role, password);
            res.status(201).json({ status: 'User registered successfully' });
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    static async getUsers(req, res) {
        try {
            const limit = parseInt(req.query.limit) || 10;
            const page = parseInt(req.query.page) || 1;
            const users = await usersModel.getUsers(limit, page);
            res.json(users);
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    static async deleteUser(req, res) {
        try {
            const userId = req.params.id;
            await usersModel.deleteUser(userId);
            res.status(201).json({ status: 'success' });
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    static async updateUser(req, res) {
        try {
            const userId = req.params.id;
            const { newPassword } = req.body;
            await usersModel.updateUser(userId, newPassword);
            res.status(201).json({ status: 'success' });
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}

module.exports = Controller;