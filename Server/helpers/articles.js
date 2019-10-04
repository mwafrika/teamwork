import article from '../services/articleService';

class ArticleHelper {
  static getAllarticle(res) {
    const articles = article.getAllArticles();
    
    return res.status(200).send({
      status: 200,
      data: articles,
    });
  }
}

export default ArticleHelper;
