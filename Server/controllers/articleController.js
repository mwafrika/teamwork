import artService from '../services/articleService';
import artHelper from '../helpers/articles';
import db from '../models/dB';

const artController = {
  async postArticle(req, res) {
    const { email } = req.user;
    const { title, article, category } = req.body;
    const newArt = {
      email,
      createdOn: new Date().toLocaleString(),
      title,
      article,
      category,
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
  async getCategory(req, res) {
    const { category } = req.body;

    const findmatch = await artService.getAllCategory(category);
    if (findmatch.length < 1) return res.status(404).send({ status: 404, message: 'No such category is available' });
    return res.status(200).send({
      status: 200,
      data: findmatch,
    });
  },
  async getSpecific(req, res) {
    const { id } = req.params;
    const artid = parseInt(id, 10);
    const comment = db.comments.filter((com) => com.artID === artid);
    const noComment = [];
    const commToSend = comment.length > 0 ? comment : noComment;
    const findArticle = await artService.getSpecific(id, commToSend);
    if (!findArticle) return res.status(404).send({ status: 'error', error: 'Article not found, please try another' });

    return res.status(200).send({
      status: 200,
      data: findArticle,
    });
  },
  async deleteArticle(req, res) {
    const { id } = req.params;
    const { email } = req.user;
    const findArticle = await artService.deleteArticle(parseInt(id, 10), email);
    if (findArticle === -1) return res.status(404).send({ status: 404, error: 'Article not found' });
    return res.status(200).send({
      status: 200,
      data: 'Article successfully deleted',
    });
  },


  editArticle(req, res) {
    const { email } = req.user;
    const { article, title } = req.body;
    const { id } = req.params;
    
    const editArt = artService.editArticles(email, parseInt(id, 10), article, title);
    if (!editArt) return res.status(404).send({ status: 'error', err: 'article not found' });
    return res.status(200).send({
      status: 200,
      message: 'successfully updated',
      data: editArt,
    });
  },

};
export default artController;
