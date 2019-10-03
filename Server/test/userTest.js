import chai, { expect } from 'chai';
import chaiHtpp from 'chai-http';
import app from '../../index';
import mockUser from './mockData/userData';

chai.use(chaiHtpp);

describe('User should be able to signup', () => {
  it('Should return an object with a message and 200 status when user accesses the root', (done) => {
    chai.request(app)
      .get('/')
      .set('Authorization', 'application/json')
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
  it('should successfully signup', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(mockUser.signup[0])
      .end((err, res) => {
        expect(res.body).to.be.a('object');
        expect(res.status).to.equal(201);
        expect(res.body.data).to.have.keys(['id', 'firstName', 'lastName', 'email', 'jobRole']);
        done();
      });
  });
  it('should not allow user to signup with an existing email', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(mockUser.signup[0]).end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.error).to.equal('email already exists');
        done();
      });
  });
  it('should not signup with a wrong email address', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(mockUser.signup[2]).end((err, res) => {
        expect(res.status).to.equal(422);
        expect(res.body.error).to.equal('email is not valid');
        done();
      });
  });
  it('should not signup with an empty firstName', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(mockUser.signup[3]).end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.error).to.equal('first name cannot be empty');
        done();
      });
  });
  it('should not signup with an empty last name', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(mockUser.signup[4]).end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.error).to.equal('last name cannot be empty');
        done();
      });
  });
  it('should not signup with an empty email', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(mockUser.signup[5]).end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.error).to.equal('email cannot be empty');
        done();
      });
  });
  it('should not signup with an empty password', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(mockUser.signup[6]).end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.error).to.equal('password cannot be empty');
        done();
      });
  });
  it('should not signup with an empty gender', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(mockUser.signup[7]).end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.error).to.equal('gender cannot be empty');
        done();
      });
  });
  it('should not signup with an empty job role', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(mockUser.signup[8]).end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.error).to.equal('jobRole cannot be empty');
        done();
      });
  });
  it('should not signup with an empty department', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(mockUser.signup[9]).end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.error).to.equal('department cannot be empty');
        done();
      });
  });
  it('should not signup with an empty address', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(
        mockUser.signup[10],
      ).end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.error).to.equal('address cannot be empty');
        done();
      });
  });
  it('should not signup with first name containing numbers', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(mockUser.signup[11]).end((err, res) => {
        expect(res.status).to.equal(422);
        expect(res.body.error).to.equal('first name cannot contain numbers');
        done();
      });
  });
  it('should not signup with last name containing numbers', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(
        mockUser.signup[12],
      ).end((err, res) => {
        expect(res.status).to.equal(422);
        expect(res.body.error).to.equal('last name cannot contain numbers');
        done();
      });
  });
  it('should not signup with gender containing numbers', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(
        mockUser.signup[13],
      ).end((err, res) => {
        expect(res.status).to.equal(422);
        expect(res.body.error).to.equal('gender cannot contain numbers');
        done();
      });
  });
});
describe('should be able to signin', () => {
  it('should not allow to signin with unregistered information', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send(mockUser.login[4]).end((err, res) => {
        expect(res.status).to.equal(401);
        expect(res.body.error).to.equal('invalid credentials!!');
        done();
      });
  });

  it('should signin in successfully', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send(mockUser.login[0]).end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(200);
        expect(res.body.data).to.have.key(['id', 'lastName', 'email']);
        done();
      });
  });
  it('should not login with empty email', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send(mockUser.login[2]).end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.error).to.equal('email cannot be empty');
        done();
      });
  });
  it('should not signin with empty password', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send(mockUser.login[3]).end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.error).to.equal('password cannot be empty');
        done();
      });
  });
});
