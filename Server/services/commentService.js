/* eslint-disable eqeqeq */
import article from '../models/dB';

class postComment {
  static postComment(data) {
    const { artID } = data;
    const findArt = article.articles.find(((art) => art.id == artID));

    if (!findArt) return false;
    const newComment = {
      ...data,
    };

    article.comments.push(newComment);
    console.log(newComment);
    return newComment;
  }
}
export default postComment.postComment;
