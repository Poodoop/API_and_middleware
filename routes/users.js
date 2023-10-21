var express = require('express')
var router = express.Router()

var pool = require('../config/queries.js')

const { signToken, verifyToken } = require('../middleware/authMiddleware');

router.post('/login', function (req, res) {
    const { email, password } = req.body
    pool.query(
        `SELECT * FROM users WHERE email = $1 AND password = $2`,
        [email, password], (error, results) => {
            if (error) {
                return res.status(500).json({ error: 'Internal server error' })
            } else {
                const token = signToken(results.rows[0])
                res.json({ token: token })
            }
        }
    )
})

router.post('/register', function (req, res) {
    const { id, email, gender, role, password } = req.body
    pool.query(
        'INSERT INTO users (id, email, gender, role, password) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [id, email, gender, role, password], (error, results) => {
            if (error) {
                return res.status(500).json({ error: 'Internal server error' })
            }
            res.status(201).json({ status: 'User registered successfully' })
        }
    )
})

router.get('/', function (req, res) {
    const limit = parseInt(req.query.limit) || 10
    const page = parseInt(req.query.page) || 1

    const startIndex = (page - 1) * limit

    pool.query(
        'SELECT id, email, gender, role, password FROM users OFFSET $1 LIMIT $2',
        [startIndex, limit], (error, results) => {
            if (error) {
                return res.status(500).json({ error: 'Internal server error' })
            }
            res.json(results.rows)
        }
    )
})

router.delete('/:id', verifyToken, function (req, res) {
    const userId = req.params.id
    pool.query(
        'DELETE FROM users WHERE id = $1',
        [userId], (error, results) => {
            if (error) {
                return res.status(500).json({ error: 'Internal server error' })
            }
            res.status(201).json({ status: 'success' })
        }
    )
})


router.put('/:id', verifyToken, function (req, res) {
    const userId = req.params.id
    const { password } = req.body
    pool.query(
        'UPDATE users SET password = $1 WHERE id = $2',
        [password, userId], (error, results) => {
            if (error) {
                return res.status(500).json({ error: 'Internal server error' })
            }
            res.status(201).json({ status: 'success' })
        }
    )
})

module.exports = router