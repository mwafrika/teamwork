import { isString } from 'util';
import Validator from './validateInputs';

class ValidateInfo {
  static signupVerify(req, res, next) {
    const {
      firstName, lastName, password, email, address, jobRole, gender, department,
    } = req.body;
    const resp = (error, code) => res.status(code).send({ status: 'error', error });
    if (Validator.checkEmpty(email)) return resp('email cannot be empty', 400);
    if (Validator.checkEmpty(lastName)) return resp('last name cannot be empty', 400);
    if (Validator.checkEmpty(password)) return resp('password cannot be empty', 400);
    if (Validator.checkEmpty(firstName)) return resp('first name cannot be empty', 400);
    if (Validator.checkEmpty(address)) return resp('address cannot be empty', 400);
    if (Validator.checkEmpty(jobRole)) return resp('jobRole cannot be empty', 400);
    if (Validator.checkEmpty(gender)) return resp('gender cannot be empty', 400);
    if (Validator.checkEmpty(department)) return resp('department cannot be empty', 400);

    if (!Validator.isEmail(email)) return resp('email is not valid', 422);
    if (Validator.isNotNumber(firstName)) return resp('first name cannot contain numbers', 422);
    if (Validator.isNotNumber(lastName)) return resp('last name cannot contain numbers', 422);
    if (Validator.isNotNumber(gender)) return resp('gender cannot contain numbers', 422);

    return next();
  }

  static signinVerify(req, res, next) {
    const { email, password } = req.body;
    const response = (error, code) => res.status(code).send({ status: 'error', error });
    if (Validator.checkEmpty(password)) return response('password cannot be empty', 400);
    if (Validator.checkEmpty(email)) return response('email cannot be empty', 400);

    return next();
  }

  static createArticle(req, res, next) {
    const { title, article } = req.body;
    const response = (error, code) => res.status(code).send({ status: 'error', error });
    if (Validator.checkEmpty(title)) return response('title cannot be empty', 400);
    if (Validator.checkEmpty(article)) return response('article cannot be empty', 400);

    return next();
  }

  static getSpecificArticle(req, res, next) {
    const { id } = req.params;

    const response = (error, code) => res.status(code).send({ status: 'error', error });
    if (id === undefined) return response('please specify the id', 400);
    if (isNaN(id)) return response('please provide a valid, id cannot be a string value', 422);

    return next();
  }

  static editVerify(req, res, next) {
    const { article, title } = req.body;
    const { id } = req.params;
    const response = (error, code) => res.status(code).send({ status: 'error', error });
    if (Validator.checkEmpty(article)) return response('article cannot be empty', 400);
    if (Validator.checkEmpty(title)) return response('title cannot be empty', 400);
    if (isNaN(id)) return response('please enter a valid number', 422);

    return next();
  }

  static commentVerify(req, res, next) {
    const { artID } = req.params;
    const { comment } = req.body;
    const response = (error, code) => res.status(code).send({ status: 'error', error });
    if (Validator.checkEmpty(artID)) return response('please specify the article ID', 400);
    if (Validator.checkEmpty(comment)) return response('comment cannot be empty', 400);
    if (isNaN(artID)) return response('article ID must be a number', 422);
    return next();
  }

  static ArticleCategory(req, res, next) {
    const { category } = req.body;
    const response = (error, code) => res.status(code).send({ status: 'error', error });
    if (Validator.checkEmpty(category)) return response('specify the category', 400);
    if (!isString(category)) return response('category must be a string', 400);
    return next();
  }
}
export default ValidateInfo;
