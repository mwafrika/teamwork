import { Router } from 'express';
import authorize from '../middleware/generateToken';
import inputChecker from '../middleware/Validation';
import artController from '../controllers/articleController';

const router = Router();
router
  .post('/api/v1/article', authorize, inputChecker.createArticle, artController.postArticle)
  .get('/api/v1/article', authorize, artController.getAll)
  .get('/api/v1/article/:id', authorize, inputChecker.getSpecificArticle, artController.getSpecific)
  .delete('/api/v1/article/:id', authorize, inputChecker.getSpecificArticle, artController.deleteArticle)
  .patch('/article/:id/article', authorize, inputChecker.editVerify, artController.editArticle);

export default router;
