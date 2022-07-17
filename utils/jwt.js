const jwt = require('jsonwebtoken');
require('dotenv').config();

const secret = process.env.JWT_SECRET || 'secret';

const JWT_CONFIG = {
  expiresIn: '40h',
  algorithm: 'HS256',
};

const verifyToken = (token) => new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        reject(err);
      }
      resolve(decoded);
    });
  });

const createToken = (payload) => jwt.sign({ payload }, secret, JWT_CONFIG);

module.exports = { verifyToken, createToken };
