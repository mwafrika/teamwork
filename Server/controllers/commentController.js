import commentService from '../services/commentService';
import article from '../models/dB';

const commentControl = {

  async postComment(req, res) {
    const { params } = req;
    const { comment } = req.body;

    const comm = await commentService(params);
    if (!comm) {
      return res.status(404).send({ status: 404, error: 'Article not found' });
    }
    return res.status(200).send({
      status: 200,
      data: comm,
      // details,
    });
  },

};
export default commentControl.postComment;
