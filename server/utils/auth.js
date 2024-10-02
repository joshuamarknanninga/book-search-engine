// server/utils/auth.js

const jwt = require('jsonwebtoken');

const secret = 'mysecretsshhhhh'; // Replace with your secret in production
const expiration = '2h';

module.exports = {
  authMiddleware: ({ req }) => {
    // Allows token to be sent via req.body, req.query, or headers
    let token = req.body.token || req.query.token || req.headers.authorization;

    // If token is sent via the "Bearer" scheme, remove "Bearer" from the string
    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }

    if (!token) {
      return req;
    }

    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    } catch {
      console.log('Invalid token');
    }

    return req;
  },
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };

    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
