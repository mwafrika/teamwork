// eslint-disable-next-line import/no-extraneous-dependencies
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import userHelper from '../services/userService';

dotenv.config();

class userController {
  static SignupUser(req, res) {
    const user = req.body;
    const signup = userHelper.signup(user);
    if (!signup) {
      res.status(400).send({
        status: '400',
        error: 'email already exists',
      });
    }
    return jwt.sign(signup, process.env.JWT_SECRET, (err, token) => {
      res.status(201).send({
        token,
      });
    });
  }

  static SigninUser(req, res) {
    const user = req.body;
    const myUsers = userHelper.signin(user);
    if (!myUsers) {
      res.status(404).send({
        status: 'error',
        error: 'invalid credentials!!! no user exist',
      });
    }
    return jwt.sign(myUsers, process.env.JWT_SECRET, (err, token) => {
      res.status(200).send({
        token,
      });
    });
  }
}

export default userController;
