import { Router } from 'express';
import authorize from '../middleware/generateToken';
import inputChecker from '../middleware/Validation';
import artController from '../controllers/articleController';

const router = Router();
router
  .post('/article', authorize, inputChecker.createArticle, artController.postArticle)
  .get('/article', authorize, artController.getAll);

export default router;
