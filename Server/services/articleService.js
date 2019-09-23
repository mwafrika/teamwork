import article from '../models/dB';
// eslint-disable-next-line import/no-extraneous-dependencies
import '@babel/polyfill';

class Articles {
  static postArticle(data) {
    const newArticle = {
      id: article.articles.length,
      ...data,
    };
    article.articles.push(newArticle);
    return newArticle;
  }
}
export default Articles;
