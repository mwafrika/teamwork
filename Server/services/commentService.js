import article from '../models/dB';

class postComment {
  static postComment(data, comment) {
    const { artID } = data;
    const findArt = article.articles.find(((art) => art.id == artID));

    if (!findArt) return false;
    const newComment = {
      title: findArt.title,
      article: findArt.article,
      comment: comment,
      createdOn: new Date().toLocaleString(),
    };

    article.comments.push(newComment);
    console.log(newComment);
    return newComment;
  }
}
export default postComment.postComment;
