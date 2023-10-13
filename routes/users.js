var express = require('express')
var router = express.Router()

var pool = require('../queries.js')

router.get('/', function (req, res) {
    const limit = parseInt(req.query.limit) || 10
    const page = parseInt(req.query.page) || 1

    const startIndex = (page - 1) * limit

    pool.query(
        'SELECT id, email, gender, role FROM users OFFSET $1 LIMIT $2', [startIndex, limit], (error, results) => {
            if (error) {
                return res.status(500).json({ error: 'Internal server error' })
            }
            res.json(results.rows)
        }
    )
})

module.exports = router