/* eslint-disable import/no-extraneous-dependencies */
import chai, { expect } from 'chai';
import chaihttp from 'chai-http';
import chaiThings from 'chai-things';
import should from 'should';
import app from '../../index';
import articles from './mockData/articleData';

chai.use(chaihttp);
chai.use(chaiThings);
chai.use(should);

let token;
let tokenAdmin;

before((done) => {
  chai.request(app)
    .post('/api/v1/auth/signup')
    .set('Authorization', 'application/json')
    .send(articles[0])
    .end((err, res) => {
      token = res.body.token;
      console.log(res.body.token);
      done();
    });
});


describe('Articles', () => {
  it('Should return an object with a message and 200 status when user accesses the root', (done) => {
    chai.request(app)
      .get('/')
      .set('Authorization', token)
      .end((err, res) => {
        // if (err) done(err);
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('message');
        done();
      });
  });
  it('Should return an error with 405 status when the user accesses a wrong endpoint', (done) => {
    chai
      .request(app)
      .get('/vV')
      .set('Authorization', 'application/json')
      .end((err, res) => {
        expect(res).to.have.status(405);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('message');
        done();
      });
  });
  it('Should return an html page with 200 status when users access api documentation', (done) => {
    chai.request(app)
      .get('/api/v1/api-docs/')
      .set('Content-type', 'text/html')
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(200);
        expect(res.headers['content-type']).to.equal('text/html; charset=utf-8');
        done();
      });
  });

  it('should create an article', (done) => {
    chai.request(app)
      .post('/api/v1/article')
      .send(articles[1])
      .set('Authorization', token)
      .end((request, response) => {
        response.body.should.have.property('status').equal(201);
        response.body.should.have.property('message').equal('article successfully created');
        response.body.should.have.property('data');
        expect(response.body.data).to.be.an('object');
        response.body.data.should.have.property('createdOn');
        response.body.data.should.have.property('title').equal(articles[1].title);
        response.body.data.should.have.property('article').equal(articles[1].article);
        response.body.data.should.have.property('id').equal(articles[1].id);

        response.body.data.should.have.property('email').equal(articles[1].email);
        done();
      });
  });
  it('should not post an article with no token', (done) => {
    chai.request(app)
      .post('/api/v1/article')
      .send(articles[1])
      .set('Authorization', '')
      .end((err, res) => {
        expect(res.status).to.equal(401);
        expect(res.body.error).to.equal('You must be logged in to use this route');
        done();
      });
  });
  it('should not post article with empty title', (done) => {
    chai.request(app)
      .post('/api/v1/article')
      .send(articles[2])
      .set('Authorization', token)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.error).to.equal('title cannot be empty');
        done();
      });
  });
  it('should not post with empty article', (done) => {
    chai.request(app)
      .post('/api/v1/article')
      .send(articles[3])
      .set('Authorization', token)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.error).to.equal('article cannot be empty');
        done();
      });
  });
  it('should get all the articles', (done) => {
    chai.request(app)
      .get('/api/v1/article')
      .send(articles[1])
      .set('Authorization', token)
      .end((err, res) => {
        console.log(res.body);
        expect(res.body).to.be.an('object');
        done();
      });
  });
  it('should successfully get a specific article if the user is authenticated', (done) => {
    chai.request(app)
      .get('/api/v1/article/1')
      .send(articles[1])
      .set('Authorization', token)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        done();
      });
  });
  it('should successfully get a specific article if the user is authenticated', (done) => {
    chai.request(app)
      .get('/api/v1/article/400')
      .set('Authorization', token)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body.error).to.equal('Article not found, please try another');
        done();
      });
  });
  it('should not get a specific article with a non integer value', (done) => {
    chai.request(app)
      .get('/api/v1/article/nnnn')
      .set('Authorization', token)
      .send(articles[3])
      .end((err, res) => {
        expect(res.body.error).to.equal('please provide a valid, id cannot be a string value');
        expect(res.status).to.equal(422);
        done();
      });
  });
  it('should not delete an non iteger id', (done) => {
    chai.request(app)
      .delete('/api/v1/article/nn')
      .set('Authorization', token)
      .send(articles[4])
      .end((_err, res) => {
        expect(res.body.error).to.equal('please provide a valid, id cannot be a string value');
        expect(res.status).to.equal(422);
        done();
      });
  });
  it('should not delete if the employee is not logged in', (done) => {
    chai.request(app)
      .delete('/api/v1/article/1')
      .set('Authorization', '')
      .end((err, res) => {
        expect(res.body.error).to.equal('You must be logged in to use this route');
        expect(res.status).to.equal(401);
        done();
      });
  });
  it('should not delete an article which does not belong to an employee', (done) => {
    chai.request(app)
      .delete('/api/v1/article/1')
      .set('Autorization', token)
      .send(articles[5])
      .end((err, res) => {
        expect(res.body.error).to.equal('You must be logged in to use this route');
        expect(res.status).to.equal(401);
        done();
      });
  });
  it('should not update an article with an invalid url parameter', (done) => {
    chai.request(app)
      .patch('/api/v1/article/kkjkjjkkjj/title/article')
      .set('Authorization', token)
      .send(articles[6])
      .end((err, res) => {
        expect(res.status).to.equal(422);
        expect(res.body.error).to.equal('please enter a valid number');
        done();
      });
  });
  it('should not post a comment with empty field', (done) => {
    chai.request(app)
      .post('/api/v1/article/1/comments')
      .set('Authorization', token)
      .send(articles[9])
      .end((error, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(400);
        expect(res.body.error).to.equal('comment cannot be empty');
        done();
      });
  });
  it('should not post the comment with non numerical ID', (done) => {
    chai.request(app)
      .post('/api/v1/article/lllo/comments')
      .set('Authorization', token)
      .send()
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(422);
        expect(res.body.error).to.equal('article ID must be a number');
        done();
      });
  });
  it('should return a 200 status and the edited article', (done) => {
    chai.request(app)
      .patch('/api/v1/article/1/title/article')
      .set('Authorization', token)
      .send(articles[10])
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal('successfully updated');
        done();
      });
  });

  it('should return a 200 status and the edited article', (done) => {
    chai.request(app)
      .patch('/api/v1/article/0/title/article')
      .set('Authorization', token)
      .send(articles[10])
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(404);
        expect(res.body.err).to.equal('article not found');
        done();
      });
  });
  it('should return 200 status when delete an article', (done) => {
    chai.request(app)
      .delete('/api/v1/article/1')
      .set('Autorizatio', token)
      .end((err, res) => {
        console.log(res.body);
        expect(res.status).to.equal(401);
        done();
      });
  });
  it('should successfully post a comment', (done) => {
    chai.request(app)
      .post('/api/v1/article/1/comments')
      .set('Authorization', token)
      .send(articles[11])
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(200);
        done();
      });
  });
  it('should successfully post a comment', (done) => {
    chai.request(app)
      .post('/api/v1/article/90/comments')
      .set('Authorization', token)
      .send(articles[11])
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(404);
        done();
      });
  });

  it('should not delete an non iteger id', (done) => {
    chai.request(app)
      .delete('/api/v1/article/nn')
      .set('Authorization', token)
      .send(articles[4])
      .end((_err, res) => {
        expect(res.body.error).to.equal('please provide a valid, id cannot be a string value');
        expect(res.status).to.equal(422);
        done();
      });
  });

  it('should delete an article', (done) => {
    chai.request(app)
      .delete('/api/v1/article/1')
      .send(articles[5])
      .set('Authorization', token)
      .end((err, res) => {
        expect(res.body.data).to.equal('Article successfully deleted');
        expect(res.status).to.equal(200);
        done();
      });
  });
});
