const jwt = require('jsonwebtoken');

const UnauthorizedError = require('../errors/unauthorized-err');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res
      .status(401)
      .send({ message: 'Необходима авторизация' });
  }
  const token = authorization.replace('Bearer ', '');

  // if (!req.cookies.jwt) { next(new UnauthorizedError('Необходима авторизация')); }
  // const token = req.cookies.jwt;

  let payload;
  try {
    payload = jwt.verify(token, 'RsZNpZ6yARkdc66');
  } catch (err) {
    return next(new UnauthorizedError('Необходима авторизация'));
  }
  req.user = payload;
  return next();
};
