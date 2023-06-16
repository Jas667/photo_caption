const jwt = require("jsonwebtoken");

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.js')[env];

module.exports = {
  //function to verify token from cookie
  verifyToken(req, res, next) {
    const token = req.cookies.token;
    if (!token) {
      res.status(403).send({ message: 'No token provided' });
    } else {
      jwt.verify(token, config.jwtSecret, function (err, decoded) {
        if (err) {
          res.status(500).send({ message: 'Failed to authenticate token' });
        }
        req.userId = decoded.id;
        req.username = decoded.username;
        req.superUser = decoded.superUser;
        next();
      });
    }
  }
}