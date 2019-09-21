import artService from '../services/articleService';
import artHelper from '../helpers/articles';
import ArticleHelper from '../helpers/articles';
import db from '../models/dB';

const artController = {

  async postArticle(req, res) {
    const { email } = req.user;
    const { title, article } = req.body;
    const newArt = {
      email,
      createdOn: new Date().toLocaleString(),
      title,
      article,
    };
    const addArt = await artService.postArticle(newArt);
    return res.status(201).send({
      status: 201,
      message: 'article successfully created',
      data: addArt,
    });
  },

  getAll(req, res) {
    return artHelper.getAllarticle(res);
  },
  async getSpecific(req, res) {
    const { email } = req.user; // email of authenticated user
    const { id } = req.params;

    const findArticle = await artService.getSpecific(id, email);
    if (!findArticle) return res.status(404).send({ status: 'error', error: 'Article not found, please try another' });

    return res.status(200).send({
      status: 'success',
      data: findArticle,
    });
  },
  async deleteArticle(req, res) {
    const { id } = req.params;
    const { email } = req.user;
    const findArticle = artService.deleteArticle(id, email);
    if (findArticle === -1 || !findArticle) return res.status(404).send({ status: 404, error: 'Article not found' });
    return res.status(204).send({
      status: 204,
      data: 'Article successfully deleted',
    });
  },
};
export default artController;
