const jwt = require('jsonwebtoken');
require('dotenv').config();

const authMiddleware = (req, res, next) => {
  // const token = req.headers.authorization?.split(' ')[1]; // Bearer <token>
  const token = req.headers.token;
  if (!token) {
    return res.status(401).send('Access denied. No token provided.');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // req.userId = decoded.userId; // Attach user ID to the request
    req.user = {
      id: decoded.userId,
      role_id: decoded.roleId, // Include this in your JWT payload
    };
    next();
  } catch (err) {
    res.status(400).send('Invalid token.');
  }
};

module.exports = authMiddleware;
