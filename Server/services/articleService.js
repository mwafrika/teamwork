/* eslint-disable eqeqeq */
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

  static getSpecific(artID, userEmail) {
    // eslint-disable-next-line max-len
    const specific = article.articles.find(((art) => art.id == artID && art.email == userEmail));
    if (!specific) return false;
    return specific;
  }

  static deleteArticle(id, email) {
    const findArticle = article.articles.findIndex(((art) => art.id == id && art.email == email));
    if (findArticle === -1) return false;
    return article.articles.splice(findArticle, 1);
  }

  static editArticles(userEmail, articleID, articl, title) {
    // eslint-disable-next-line max-len
    const findArt = article.articles.find(((art) => art.email == userEmail && art.id == articleID));
    if (!findArt) return false;
    const artIndex = article.articles.indexOf(findArt);
    findArt.article = articl;
    findArt.title = title;
    findArt.article.slice(artIndex, 1, findArt); // to be reviewed to add 2

    return findArt;
  }
}
export default Articles;
