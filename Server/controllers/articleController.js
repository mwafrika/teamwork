import artService from '../services/articleService';
import artHelper from '../helpers/articles';

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

};
export default artController;
