import article from '../services/articleService';


class ArticleHelper {
  static async getAllarticle(res) {
    const articles = await article.getAllArticles();
    if (articles.length <= 0) return res.status(404).send({ message: 'articles database is empty' });
    return res.status(200).send({
      status: 200,
      data: articles,
    });
  }
}

export default ArticleHelper;
