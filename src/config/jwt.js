const jwt = require('jsonwebtoken');

const generateToken = (userId) => {
  console.log('Generating token for user ID:',  process.env.JWT_SECRET,);
  return jwt.sign(
    { id: userId },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
  );
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    // Retornar el error para poder distinguir entre expirado e inválido
    if (error.name === 'TokenExpiredError') {
      return { error: 'expired', expiredAt: error.expiredAt };
    }
    if (error.name === 'JsonWebTokenError') {
      return { error: 'invalid' };
    }
    return { error: 'unknown' };
  }
};

module.exports = {
  generateToken,
  verifyToken
};
