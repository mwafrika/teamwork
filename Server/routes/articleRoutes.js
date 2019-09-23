import { Router } from 'express';
import authorize from '../middleware/generateToken';
import inputChecker from '../middleware/Validation';
import artController from '../controllers/articleController';

const router = Router();

router.post('/api/v1/article', authorize, inputChecker.createArticle, artController.postArticle);
router.get('/api/v1/article', authorize, artController.getAll);
router.get('/api/v1/article/:id', authorize, inputChecker.getSpecificArticle, artController.getSpecific);
router.delete('/api/v1/article/:id', authorize, inputChecker.getSpecificArticle, artController.deleteArticle);
export default router;
