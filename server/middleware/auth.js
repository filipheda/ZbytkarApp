const jwt = require('jsonwebtoken');
const { UnauthorizedError } = require('../utils/errors.js');

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader?.startsWith('Bearer ')) {
    throw new UnauthorizedError('Neplatný autorizační formát');
  }

  const token = authHeader.split(' ')[1];
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { 
      userId: decoded.userId,
      email: decoded.email
    };
    next();
  } catch (error) {
    throw new UnauthorizedError('Neplatný nebo expirovaný token');
  }
};

module.exports = authMiddleware;
