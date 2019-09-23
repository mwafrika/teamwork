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
  id: 4,
  title: 'Eget duis at tellus at urna condimentum mattis pellentesque id',
  article: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  email: 'mwafrikajosue@gmail.com',
};
const emptyID = {
  id: null,
  title: 'Eget duis at tellus at urna condimentum mattis pellentesque id',
  article: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  email: 'mwafrikajosue@gmail.com',
};
const emptyTitle = {
  title: '',
  article: 'Eget duis at tellus at urna condimentum mattis pellentesque id',
};
const emptyArticle = {
  title: 'Eget duis at tellus at urna condimentum mattis pellentesque id',
  article: '',
};
const articleNotFound = {
  id: 8,
  title: 'Eget duis at tellus at urna condimentum mattis pellentesque id',
  article: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  email: 'mwafrikajosue@gmail.com',
};
const articleOwner = {
  id: 1,
  email: 'mwafrikajosue@gmail.com',
  password: '123456',
};


describe('Articles', () => {
  it('should create an article', (done) => {
    chai.request(app)
      .post('/api/v1/article')
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
        response.body.data.should.have.property('id').equal(data.id);
        response.body.data.should.have.property('email').equal(data.email);
        done();
      });
  });
  it('should not post an article with no token', (done) => {
    chai.request(app)
      .post('/api/v1/article')
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
      .post('/api/v1/article')
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
      .post('/api/v1/article')
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
      .get('/api/v1/article')
      .send(data)
      .set('Authorization', token)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        done();
      });
  });
  it('should successfully get a specific article if the user is authenticated', (done) => {
    chai.request(app)
      .get('/api/v1/article/:id')
      .send(data)
      .set('Authorization', token)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        done();
      });
  });
  // it('should not get a specific article if the user has not Article', (done) => {
  //   chai.request(app)
  //     .get('/api/v1/article/:id')
  //     .set('Authorization', token)
  //     .send(articleNotFound)
  //     .end((err, res) => {
  //       expect(res.body).to.be.an('object');
  //       expect(res.body.error).to.equal('Article not found, please try another');
  //       expect(res.status).to.equal(404);
  //       console.log(res.body.token);
  //       done();
  //     });
  // });
  it('should not get a specific article with a non integer value', (done) => {
    chai.request(app)
      .get('/api/v1/article/:id')
      .set('Authorization', token)
      .send({ id: 'y' })
      .end((err, res) => {
        expect(res.body.error).to.equal('please provide a valid, id cannot be a string value');
        expect(res.status).to.equal(422);
        done();
      });
  });
});
