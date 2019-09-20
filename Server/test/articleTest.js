import chai, { expect } from 'chai';
import chaihttp from 'chai-http';
import chaiThings from 'chai-things';
import should from 'should';
import app from '../../index';

chai.use(chaihttp);
chai.use(chaiThings);
chai.use(should);

let token;
let tokenAdmin;

before((done) => {
  chai.request(app)
    .post('/api/v1/auth/signin')
    .send({
      email: 'mwafrikajosue@gmail.com',
      password: '123456',
    })
    .end((err, res) => {
      token = res.body.token;
      console.log(res.body.token);
      done();
    });
});
const data = {
  title: 'Eget duis at tellus at urna condimentum mattis pellentesque id',
  article: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
};
const emptyTitle = {
  title: '',
  article: 'Eget duis at tellus at urna condimentum mattis pellentesque id',
};
const emptyArticle = {
  title: 'Eget duis at tellus at urna condimentum mattis pellentesque id',
  article: '',
};

describe('Articles', () => {
  it('should create an article', (done) => {
    chai.request(app)
      .post('/article')
      .send(data)
      .set('Authorization', token)
      .end((request, response) => {
        response.body.should.have.property('status').equal(201);
        response.body.should.have.property('message').equal('article successfully created');
        response.body.should.have.property('data');
        expect(response.body.data).to.be.an('object');
        response.body.data.should.have.property('createdOn');
        response.body.data.should.have.property('title').equal(data.title);
        response.body.data.should.have.property('article').equal(data.article);
        done();
      });
  });
  it('should not post an article with no token', (done) => {
    chai.request(app)
      .post('/article')
      .send(data)
      .set('Authorization', '')
      .end((err, res) => {
        expect(res.status).to.equal(401);
        expect(res.body.error).to.equal('You must be logged in to use this route');
        done();
      });
  });
  it('should not post article with empty title', (done) => {
    chai.request(app)
      .post('/article')
      .send(emptyTitle)
      .set('Authorization', token)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.error).to.equal('title cannot be empty');
        done();
      });
  });
  it('should not post with empty article', (done) => {
    chai.request(app)
      .post('/article')
      .send(emptyArticle)
      .set('Authorization', token)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.error).to.equal('article cannot be empty');
        done();
      });
  });
  it('should get all the articles', (done) => {
    chai.request(app)
      .get('/article')
      .send(data)
      .set('Authorization', token)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        done();
      });
  });
});
