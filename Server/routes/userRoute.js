import router from 'express';
import validInfo from '../middleware/Validation';
import userController from '../controllers/userController';

const app = router.Router();

app
  .post('/api/v1/auth/signup', validInfo.signupVerify, userController.SignupUser);

export default app;
