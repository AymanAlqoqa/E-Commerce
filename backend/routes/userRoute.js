import express from 'express';
import User from '../models/userModel';
import { getToken } from '../util';

const router = express.Router();

router.get('/createAdmin', async (req, res) => {
  try {
    const user = new User({
      name: 'Ayman',
      email: 'aalqouqa@gmail.com',
      password: '123456',
      isAdmin: true,
    });

    const newUser = await user.save();
    res.status(201).send(newUser);
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
});

router.post('/signin', async (req, res) => {
  const signinUser = await User.findOne({
    email: req.body.email,
    password: req.body.password,
  });

  if (signinUser) {
    res.send({
      _id: signinUser._id,
      name: signinUser.name,
      email: signinUser.email,
      isAdmin: signinUser.isAdmin,
      token: getToken(signinUser),
    });
  } else {
    res.status(401).send({
      message: 'invalid email or password',
    });
  }
});
router.post('/register', async (req, res) => {
  try {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    const newUser = await user.save();
    if (newUser) {
      res.send({
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        isAdmin: newUser.isAdmin,
        token: getToken(newUser),
      });
    } else {
      res.status(401).send({
        message: 'invalid user data',
      });
    }
  } catch (error) {
    res.status(401).send({
      message: error.message,
    });
  }
});

export default router;
