import config from './config';

import jwt from 'jsonwebtoken';

const getToken = (user) =>
  jwt.sign(
    {
      sub: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    config.JWT_SECRET,
    {
      expiresIn: '48h',
    }
  );

const isAuth = (req, res, next) => {
  const token = req.headers.authorization;
  console.log(token, 222);
  if (token) {
    const onlyToken = token.slice(7, token.length);
    jwt.verify(onlyToken, config.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).send({ msg: 'invalid token' });
      } else {
        req.user = decoded;
        next();
        return;
      }
    });
  } else {
    return res.status(401).send({ msg: 'token is not supplied' });
  }
};

const isAdmin = (req, res, next) => {
  console.log(req.user, 4444);
  if (req.user && req.user.isAdmin) {
    return next();
  } else {
    return res.status(401).send({ msg: 'Admin token is not valid' });
  }
};

export { getToken, isAuth, isAdmin };
