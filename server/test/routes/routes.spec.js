import request from 'supertest';
import chai from 'chai';
import app from '../../../server';
import helper from '../helper/test.helper';

const superRequest = request.agent(app);
const expect = chai.expect;
let email = '';
let userId = '';
let lists = {};

describe('TODO lIST API', () => {
  describe('CREATE USER', () => {
    it('should create a user', (done) => {
      superRequest.post('/users')
      .send(helper.newCredentials)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body.message).to.equal('Your account has been successfully created');
        done();
      });
    });

    it('should display an error if the user already exists', (done) => {
      superRequest.post('/users')
      .send(helper.loginCredentials)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('The email address is already in use by another account.');
        done();
      });
    });

    it('should not create an account without a valid email', (done) => {
      superRequest.post('/users')
      .send(helper.noEmailCredential)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('Enter a valid email');
        done();
      });
    });

    it('should not create an account without a valid password', (done) => {
      superRequest.post('/users')
      .send(helper.noPasswordCredential)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('Enter a valid password');
        done();
      });
    });
  });

  describe('LOGIN USER', () => {
    it('should log a user in', (done) => {
      superRequest.post('/login')
      .send(helper.loginCredentials)
      .end((err, res) => {
        email = helper.loginCredentials.email;
        userId = res.body.uid;
        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal('You have succesfully signed in');
        done();
      });
    });

    it('should not login a user with wrong password', (done) => {
      superRequest.post('/login')
      .send(helper.wrongPassword)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('Your password is invalid');
        done();
      });
    });

    it('should not login a user with an unregistered email', (done) => {
      superRequest.post('/login')
      .send(helper.wrongEmail)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('This email is not registered, please sign up');
        done();
      });
    });

    it('should not login a user when email is not supplied', (done) => {
      superRequest.post('/login')
      .send(helper.loginNoEmail)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('Enter a valid email');
        done();
      });
    });

    it('should not login a user when password is not supplied', (done) => {
      superRequest.post('/login')
      .send(helper.loginNoPassword)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('Enter a valid password');
        done();
      });
    });
  });

  describe('RESET PASSWORD', () => {
    it('should send a mail to the user to reset password', (done) => {
      superRequest.post('/resetPassword')
      .send(helper.loginNoPassword)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal('Reset password email sent succesfully');
        done();
      });
    });

    it('should not send a mail to an unregistered email', (done) => {
      superRequest.post('/resetPassword')
      .send(helper.noPasswordCredential)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('This email is not registered, please sign up');
        done();
      });
    });

    it('should not send a mail if email is not provided', (done) => {
      superRequest.post('/resetPassword')
      .send({})
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('Enter a valid email');
        done();
      });
    });
  });

  describe('CREATE LIST', () => {
    it('should create a new list for a user', (done) => {
      helper.createList.userId = userId;
      superRequest.post('/createtask')
      .send(helper.createList)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body.message).to.equal('Your task has been added');
        done();
      });
    });

    it('should not create list if priority is not normal, urgent or critical', (done) => {
      helper.invalidPriorityList.userId = userId;
      superRequest.post('/createtask')
      .send(helper.invalidPriorityList)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('Priority can either be normal, urgent or critical');
        done();
      });
    });

    it('should not create a new list if title is invalid', (done) => {
      helper.createList.title = null;
      helper.createList.userId = userId;
      superRequest.post('/createtask')
      .send(helper.createList)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('Enter a valid title');
        done();
      });
    });

    it('should not create a new list if task is invalid', (done) => {
      helper.createList.task = null;
      helper.createList.title = 'title';
      helper.createList.userId = userId;
      superRequest.post('/createtask')
      .send(helper.createList)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('Enter a valid task');
        done();
      });
    });

    it('should not create a new list if user id is invalid', (done) => {
      helper.createList.userId = null;
      helper.createList.task = 'task';
      superRequest.post('/createtask')
      .send(helper.createList)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('Enter a valid userId');
        done();
      });
    });

    it('should not create a new list if date is invalid', (done) => {
      helper.createList.userId = userId;
      helper.createList.date = null;
      superRequest.post('/createtask')
      .send(helper.createList)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('Enter a due date');
        done();
      });
    });
  });

  describe('SHARE TODO LIST', () => {
    it('should have a valid route for user to share list', (done) => {
      const title = helper.createList.title;
      superRequest.get(`/sharelist/?uid=${userId}&title=${title}`)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal('Your ToDo List');
        done();
      });
    });
  });

  describe('RETRIEVE LIST', () => {
    it('should retrieve a user\'s lists', (done) => {
      superRequest.get(`/users/?q=${userId}`)
      .end((err, res) => {
        lists = res.body.data;
        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal('Your ToDo Lists');
        expect(res.body.data).to.exist;
        done();
      });
    });
  });

  describe('UPDATE LIST', () => {
    it('should not update a user\'s lists without a taskKey', (done) => {
      helper.updateData.userId = userId;
      superRequest.post('/updatelist')
      .send(helper.updateData)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('Enter a valid taskKey');
        done();
      });
    });

    it('should not update a user\'s lists without a title', (done) => {
      helper.updateData.userId = userId;
      helper.updateData.title = null;
      superRequest.post('/updatelist')
      .send(helper.updateData)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('Enter a valid title');
        done();
      });
    });
  });

  describe('DELETE LIST', () => {
    it('should delete a user\'s lists', (done) => {
      helper.deleteData.userId = userId;
      superRequest.post('/deletelist')
      .send(helper.deleteData)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal('Your list has been deleted');
        done();
      });
    });
  });

  describe('LOGOUT USER', () => {
    it('should logout a user', (done) => {
      superRequest.get('/logout')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal('Logout Succesful');
        done();
      });
    });
  });
});

