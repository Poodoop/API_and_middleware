var express = require('express')
var multer = require('multer')

var router = express.Router()

var pool = require('../config/queries.js')

var auth = require('../middleware/authMiddleware.js');

const diskStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '/upload'));
    },
    filename: function (req, file, cb) {
        cb(
            null,
            file.fieldname + '-' + Date.now() + path.extname(file.originalname)
        );
    },
});

router.get('/', auth, function (req, res) {
    const limit = parseInt(req.query.limit) || 10
    const page = parseInt(req.query.page) || 1

    const startIndex = (page - 1) * limit

    pool.query(
        'SELECT * FROM movies OFFSET $1 LIMIT $2',
        [startIndex, limit], (error, results) => {
            if (error) {
                return res.status(500).json({ error: 'Internal server error' })
            }
            res.json(results.rows)
        }
    )
})


router.post('/', auth, function (req, res) {
    const { title, genres, year } = req.body
    pool.query(
        'INSERT INTO movies ("title", "genres", "year") VALUES ($1, $2, $3)',
        [title, genres, year], (error, results) => {
            if (error) {
                return res.status(500).json({ error: 'Internal server error' })
            }
            res.status(201).json({ status: 'success' })
        }
    )
})



router.delete('/:id', auth, function (req, res) {
    const movieId = req.params.id
    pool.query(
        'DELETE FROM movies WHERE id = $1',
        [movieId], (error, results) => {
            if (error) {
                return res.status(500).json({ error: 'Internal server error' })
            }
            res.status(201).json({ status: 'success' })
        }
    )
})

router.put('/upload', multer({ storage: diskStorage }).single('photo'), function (req, res) {
    const file = req.file.path;
    console.log(file);
    if (!file) {
        res.status(400).send({
            status: false,
            data: 'No File is selected.',
        });
    }
    res.send(file);
})

router.put('/:id', auth, function (req, res) {
    const movieId = req.params.id
    const { year } = req.body
    pool.query(
        'UPDATE movies SET year = $1 WHERE id = $2',
        [year, movieId], (error, results) => {
            if (error) {
                return res.status(500).json({ error: 'Internal server error' })
            }
            res.status(201).json({ status: 'success' })
        }
    )
})

module.exports = router