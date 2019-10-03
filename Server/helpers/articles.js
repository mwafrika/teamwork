import article from '../services/articleService';


class ArticleHelper {
  static async getAllarticle(res) {
    const articles = await article.getAllArticles();
    return res.status(200).send({
      status: 200,
      data: articles,
    });
  }
}

export default ArticleHelper;
