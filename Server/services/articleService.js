import article from '../models/dB';
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

  static getAllCategory(category) {
    const myCategory = article.articles.filter((cat) => cat.category == category);
    if (myCategory === -1) return false;
    return myCategory;
  }

  static getSpecific(artID, comment) {
    const specific = article.articles.find(((art) => art.id == artID));

    let details = undefined;
    if (specific) {
      const user = article.users.find(u => u.email === specific.author.email);
      const userData ={
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      }
      details = {
      ...specific,
        comment,
        author: userData,
      
      };
    }
    if (!details) return undefined;
    return details;
  }
    
  
    static  deleteArticle(id, email) {

    const findArticle = article.articles.find(((art) => art.id == id && art.author.email == email));
    if (!findArticle) return false;
    return article.articles.splice(findArticle, 1);
  }

  static editArticles(userEmail, articleID, articl, title) {
    const findArt = article.articles.find(((art) => art.author.email == userEmail && art.id == articleID));
    if (!findArt) return false;
    const artIndex = article.articles.indexOf(findArt);
    findArt.article = articl;
    findArt.title = title;
    findArt.article.slice(artIndex, 1, findArt);
    return findArt;
  }
}
export default Articles;
