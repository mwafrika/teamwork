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
        status: 201,
        message: 'User account successfully created',
        token,
        data: signup,
      });
    });
  }

  static SigninUser(req, res) {
    const user = req.body;
    const myUsers = userHelper.signin(user);
    if (!myUsers) {
      res.status(401).send({
        status: '401',
        error: 'invalid credentials!!',
      });
    }
    return jwt.sign(myUsers, process.env.JWT_SECRET, (err, token) => {
      res.status(200).send({
        status: 200,
        message: 'successfully logged in',
        token,
        data: myUsers,
      });
    });
  }
}

export default userController;
