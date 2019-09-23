import artService from '../services/articleService';

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
};
export default artController;
