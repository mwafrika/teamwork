import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

class Token {
  static async authorize(req, res, next) {
    try {
      const token = req.headers.authorization;
      if (!token) return res.status(400).send({ error: 'error', message: 'Please sigin to access this route' });
      const decoded = await jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      return next();
    } catch (error) {
      return res.status(400).send({ status: 'error', message: 'you are not authorized,' });
    }
  }
}
export default Token.authorize;
