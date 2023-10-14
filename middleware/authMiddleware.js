const jwt = require('jsonwebtoken')

const verifyToken = (token) => {
  const data = jwt.verify(token, 'koderahasia')
  return data
}

const authMiddleware = (req, res, next) => {
  const token = req.body.token

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  const data = verifyToken(token)

  if (!data) {
    return res.status(401).json({ message: 'Unauthorized' })
  }
  
  next();
}

module.exports = authMiddleware;
