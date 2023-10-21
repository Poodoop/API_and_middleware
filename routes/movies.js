var express = require('express');
var router = express.Router();
var multer = require('multer');
const Controller = require('../controllers/controller.js');
const { signToken, verifyToken } = require('../middleware/authMiddleware');
const diskStorage = require('../middleware/fileMiddleware');

router.get('/', Controller.getMovies);
router.post('/', verifyToken, Controller.createMovie);
router.delete('/:id', verifyToken, Controller.deleteMovie);
router.put('/:id', verifyToken, Controller.updateMovie);
router.put('/upload/:id', multer({ storage: diskStorage }).single('photo'), Controller.uploadImage);

module.exports = router;