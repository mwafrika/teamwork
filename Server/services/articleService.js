import article from '../models/dB';
// eslint-disable-next-line import/no-extraneous-dependencies
import '@babel/polyfill';

class Articles {
  static postArticle(data) {
    const newArticle = {
      id: article.articles.length + 1,
      ...data,
    };
    article.articles.push(newArticle);
    return newArticle;
  }

  static getAllArticles() {
    return article.articles.sort((a, b) => b.id - a.id);
  }
}
export default Articles;
