import artService from '../services/articleService';
import artHelper from '../helpers/articles';
import db from '../models/dB';
import useService from '../services/userService';

const artController = {
   postArticle(req, res) {
    const { email } = req.user;
   
    const { title, article, category} = req.body;

    let Author = db.users.find(u => u.email === email);
    const author ={
      email: Author.email,
      firstName: Author.firstName,
      lastName: Author.lastName,
    }
    const newArt = {
      createdOn: new Date().toLocaleString(),
      title,
      article,
      category,
      author,
    };
    const addArt = artService.postArticle(newArt);
    return res.status(201).send({
      status: 201,
      message: 'article successfully created',
      data: addArt,
    });
  },

  getAll(req, res) {
    return artHelper.getAllarticle(res);
  },
   getCategory(req, res) {
    const { category } = req.body;

    const findmatch = artService.getAllCategory(category);
    if (findmatch.length < 1) return res.status(404).send({ status: 404, message: 'No such category is available' });
    return res.status(200).send({
      status: 200,
      data: findmatch,
    });
  },
   getSpecific(req, res) {
    const { id } = req.params;
    const comment = db.comments.filter((com) => com.artID === id);
    const noComment = [];
    const commToSend = comment.length > 0 ? comment : noComment;
    const findArticle = artService.getSpecific(id, commToSend);
    if (!findArticle) return res.status(404).send({ status: 404, error: 'Article not found, please try another' });
    return res.status(200).send({
      status: 200,
      data: findArticle,
    });
  },
   deleteArticle(req, res) {
    const { id } = req.params;
    const { email } = req.user;
    const findArticle = artService.deleteArticle(parseInt(id, 10), email);
    if (!findArticle) return res.status(401).send({ status: 401, error: 'You are not authorized to do this'});
    if(findArticle === -1) return res.status(404).send({status:404, message:'Article not found'});
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
    if (!editArt) return res.status(401).send({ status: 401, message: 'You are not authorized to do this', });
    if(editArt === -1) return res.status(404).send({status: 404,message: 'article not found'});
    return res.status(200).send({
      status: 200,
      message: 'successfully updated',
      data: editArt,
    });
  },

};
export default artController;
