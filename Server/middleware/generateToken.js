import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const authorize = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) res.status(401).send({ status: 'error', error: 'You must be logged in to use this route' });
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = decoded;
  return next();
};

export default authorize;
