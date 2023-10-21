var express = require('express');
var router = express.Router();
const Controller = require('../controllers/controller.js');
const { signToken, verifyToken } = require('../middleware/authMiddleware');

router.post('/login', Controller.login);
router.post('/register', Controller.register);
router.get('/', Controller.getUsers);
router.delete('/:id', verifyToken, Controller.deleteUser);
router.put('/:id', verifyToken, Controller.updateUser);

module.exports = router;