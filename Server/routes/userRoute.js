import { Router } from 'express';
import validInfo from '../middleware/Validation';
import userController from '../controllers/userController';

const app = Router();

app
  .post('/api/v1/auth/signup', validInfo.signupVerify, userController.SignupUser)
  .post('/api/v1/auth/signin', validInfo.signinVerify, userController.SigninUser);

export default app;
