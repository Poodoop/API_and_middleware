const jwt = require('jsonwebtoken');

function signToken(data) {
  const token = jwt.sign(data, 'koderahasia', { expiresIn: '1h' });
  return token;
}

function verifyToken(req, res, next) {
  const token = req.body.token;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  jwt.verify(token, 'koderahasia', (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    req.user = decoded;
    next();
  });
}

module.exports = { signToken, verifyToken };