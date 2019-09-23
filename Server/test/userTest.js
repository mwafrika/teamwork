import chai, { expect } from 'chai';
import chaiHtpp from 'chai-http';
import should from 'should';
import app from '../../index';

chai.use(chaiHtpp);

describe('User should be able to signup', () => {
  it('should successfully signup', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        firstName: 'mwafrika',
        lastName: 'josue',
        email: 'mwafrikajose@gmail.com',
        password: 'mwa123',
        gender: 'male',
        jobRole: 'IT manager',
        department: 'IT',
        address: 'Gisenyi',
      }).end((err, res) => {
        expect(res.body).to.be.a('object');
        expect(res.status).to.equal(201);
        expect(res.body).to.have.key(['token']);
        done();
      });
  });
  it('should not allow user to signup with an existing email', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        firstName: 'junior',
        lastName: 'jose',
        email: 'mwafrikajosue@gmail.com',
        password: '123',
        gender: 'femail',
        jobRole: 'IT officer',
        department: 'IT',
        address: 'Goma',
      }).end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.error).to.equal('email already exists');
        done();
      });
  });
  it('should not signup with a wrong email address', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        firstName: 'junior',
        lastName: 'jose',
        email: 'mwafrikajosuegmail.com',
        password: '123',
        gender: 'female',
        jobRole: 'IT officer',
        department: 'IT',
        address: 'Gisenyi',
      }).end((err, res) => {
        expect(res.status).to.equal(422);
        expect(res.body.error).to.equal('email is not valid');
        done();
      });
  });
  it('should not signup with an empty firstName', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(
        {
          firstName: '',
          lastName: 'jose',
          email: 'mwafrikajosuegmail.com',
          password: '123',
          gender: 'female',
          jobRole: 'IT officer',
          department: 'IT',
          address: 'Kinshasa',
        },
      ).end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.error).to.equal('first name cannot be empty');
        done();
      });
  });
  it('should not signup with an empty last name', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(
        {
          firstName: 'sakina',
          lastName: '',
          email: 'frikajosu@gmail.com',
          password: '123',
          gender: 'female',
          jobRole: 'IT officer',
          department: 'IT',
          address: 'Ghana',
        },
      ).end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.error).to.equal('last name cannot be empty');
        done();
      });
  });
  it('should not signup with an empty email', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(
        {
          firstName: 'jolie',
          lastName: 'jose',
          email: '',
          password: '123',
          gender: 'female',
          jobRole: 'IT officer',
          department: 'IT',
          address: 'Burundi',
        },
      ).end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.error).to.equal('email cannot be empty');
        done();
      });
  });
  it('should not signup with an empty password', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(
        {
          firstName: 'soki',
          lastName: 'jose',
          email: 'rikajosuegmail.com',
          password: '',
          gender: 'female',
          jobRole: 'IT officer',
          department: 'IT',
          address: 'Walikale',
        },
      ).end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.error).to.equal('password cannot be empty');
        done();
      });
  });
  it('should not signup with an empty gender', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(
        {
          firstName: 'jiji',
          lastName: 'jose',
          email: 'mwafrik@gmail.com',
          password: '123',
          gender: '',
          jobRole: 'IT officer',
          department: 'IT',
          address: 'Soudan',
        },
      ).end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.error).to.equal('gender cannot be empty');
        done();
      });
  });
  it('should not signup with an empty job role', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(
        {
          firstName: 'jojo',
          lastName: 'jose',
          email: 'mwafrajo@gmail.com',
          password: '123',
          gender: 'female',
          jobRole: '',
          department: 'IT',
          address: 'Bukavu',
        },
      ).end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.error).to.equal('jobRole cannot be empty');
        done();
      });
  });
  it('should not signup with an empty department', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(
        {
          firstName: 'regis',
          lastName: 'jose',
          email: 'kakule@gmail.com',
          password: '123',
          gender: 'male',
          jobRole: 'IT officer',
          department: '',
          address: 'Washington',
        },
      ).end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.error).to.equal('department cannot be empty');
        done();
      });
  });
  it('should not signup with an empty address', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(
        {
          firstName: 'heri',
          lastName: 'jose',
          email: 'alin@gmail.com',
          password: '123',
          gender: 'female',
          jobRole: 'IT officer',
          department: 'IT',
          address: '',
        },
      ).end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.error).to.equal('address cannot be empty');
        done();
      });
  });
  it('should not signup with first name containing numbers', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(
        {
          firstName: '7887677',
          lastName: 'jose',
          email: 'kasole@gmail.com',
          password: '123',
          gender: 'female',
          jobRole: 'IT officer',
          department: 'IT',
          address: 'Maniema',
        },
      ).end((err, res) => {
        expect(res.status).to.equal(422);
        expect(res.body.error).to.equal('first name cannot contain numbers');
        done();
      });
  });
  it('should not signup with last name containing numbers', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(
        {
          firstName: 'senga',
          lastName: '88887',
          email: 'kasole2@gmail.com',
          password: '123',
          gender: 'female',
          jobRole: 'IT officer',
          department: 'IT',
          address: 'Maniema',
        },
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
        {
          firstName: 'Jules',
          lastName: 'jose',
          email: 'Jumbo1@gmail.com',
          password: '123',
          gender: '12345',
          jobRole: 'IT officer',
          department: 'IT',
          address: 'Maniema',
        },
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
      .send({
        email: 'safi@gmail.com',
        password: '123',
      }).end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body.error).to.equal('invalid credentials!!! no user exist');
        done();
      });
  });

  it('should signin in successfully', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send({
        email: 'kakule@gmail.com',
        password: '1234',
      }).end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.have.key(['token']);
        done();
      });
  });
  it('should not login with empty email', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send({
        email: '',
        password: '1234',
      }).end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.error).to.equal('email cannot be empty');
        done();
      });
  });
  it('should not signin with empty password', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send({
        email: 'mwafri@gmail.com',
        password: '',
      }).end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.error).to.equal('password cannot be empty');
        done();
      });
  });
});
