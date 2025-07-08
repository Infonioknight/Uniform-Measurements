const jwt = require('jsonwebtoken');


// Generate a JWT token and store it in a cookie
const generateToken = (res, user) => {
  const token = jwt.sign({ user }, process.env.SECRET_KEY, {
    expiresIn: '30d',
  });

  res.cookie('mbmJwtToken', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development', // Use secure cookies in production
    sameSite: 'strict', // Prevent CSRF attacks
    maxAge: 3 * 24 * 60 * 60 * 1000, // 3 days
  });
};

module.exports = generateToken;