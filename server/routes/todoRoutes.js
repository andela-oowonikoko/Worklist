import express from 'express';
import firebase from 'firebase';
// import moment from 'moment';
import { dateFrom } from '../util/helper';
import cronJob from '../util/cronjob';

const todoRouter = express.Router();

todoRouter.route('/')
  .get((req, res) => {
    res.status(200).send("{ message: 'Welcome to Worklist API' }");
  });

todoRouter.get('/users/', (req, res) => {
  const userId = req.query.q;
  const worklistRef = firebase.database().ref(`${userId}/`);

  worklistRef.once('value').then((snapshot) => {
    res.status(200)
        .send({
          message: 'Your ToDo Lists',
          data: snapshot.val()
        });
  });
});

todoRouter.post('/users', (req, res) => {
  if (req.body.password && req.body.email) {
    const email = req.body.email;
    const password = req.body.password;

    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((data) => {
      res.status(201)
        .send({
          message: 'Your account has been successfully created',
          uid: data.uid
        });
    })
    .catch((error) => {
      return res.status(400)
        .send({
          message: error.message,
          errorCode: error.code
        });
    });
  } else {
    if (!req.body.email) {
      return res.status(400)
        .send({
          message: 'Enter a valid email'
        });
    }
    if (!req.body.password) {
      return res.status(400)
        .send({
          message: 'Enter a valid password'
        });
    }
  }
});

todoRouter.post('/resetPassword', (req, res) => {
  if (req.body.email) {
    const email = req.body.email;

    firebase.auth().sendPasswordResetEmail(email).then(() => {
      res.status(200)
        .send({
          message: 'Reset password email sent succesfully'
        });
    }, (error) => {
      res.status(400)
        .send({
          message: 'This email is not registered, please sign up',
          errorCode: error.code
        });
    });
  } else {
    return res.status(400)
      .send({
        message: 'Enter a valid email'
      });
  }
});

todoRouter.post('/login', (req, res) => {
  if (req.body.password && req.body.email) {
    const email = req.body.email;
    const password = req.body.password;

    firebase.auth().signInWithEmailAndPassword(email, password)
    .then((data) => {
      res.status(200)
        .send({
          message: 'You have succesfully signed in',
          uid: data.uid
        });
    })
    .catch((error) => {
      if (error.message.includes('identifier')) {
        return res.status(400)
        .send({
          message: 'This email is not registered, please sign up',
          errorCode: error.code
        });
      } else if (error.message.includes('password')) {
        return res.status(400)
        .send({
          message: 'Your password is invalid',
          errorCode: error.code
        });
      } else if (error.message.includes('network')) {
        return res.status(400)
        .send({
          message: 'Check your internet',
          errorCode: error.code
        });
      } else {
        return res.status(400)
        .send({
          message: error.message,
          errorCode: error.code
        });
      }  
    });
  } else {
    if (!req.body.email) {
      return res.status(400)
        .send({
          message: 'Enter a valid email'
        });
    }
    if (!req.body.password) {
      return res.status(400)
        .send({
          message: 'Enter a valid password'
        });
    }
  }
});

todoRouter.post('/createtask', (req, res) => {
  const userId = req.body.userId;
  const title = req.body.title;
  const task = req.body.task;
  const dueDate = req.body.date;
  const complete = req.body.complete || false;
  const priority = req.body.priority || 'normal';
  const email = 'seunowonikoko@gmail.com';

  if (userId && title && task && dueDate && priority) {
    const worklistRef = firebase.database().ref(`${userId}/${title}`);

    if (priority.toLowerCase() === 'normal' ||
      priority.toLowerCase() === 'urgent' ||
      priority.toLowerCase() === 'critical') {
      worklistRef.push({
        content: task,
        priority,
        complete,
        date: dueDate
      });

      cronJob(dateFrom(dueDate), task, email);

      return res.status(201)
        .send({
          message: 'Your task has been added',
        });
    }

    return res.status(400)
      .send({
        message: 'Priority can either be normal, urgent or critical'
      });
  } else {
    if (!title) {
      return res.status(400)
        .send({
          message: 'Enter a valid title'
        });
    }
    if (!task) {
      return res.status(400)
        .send({
          message: 'Enter a valid task'
        });
    }
    if (!dueDate) {
      return res.status(400)
        .send({
          message: 'Enter a due date'
        });
    }
    if (!priority) {
      return res.status(400)
        .send({
          message: 'Priority cannot be empty'
        });
    }
    if (!userId) {
      return res.status(400)
        .send({
          message: 'Enter a valid userId'
        });
    }
  }
});

todoRouter.get('/logout', (req, res) => {
  firebase.auth().signOut()

   .then(() => {
     return res.status(200)
        .send({
          message: 'Logout Succesful'
        });
   }, (error) => {
     return res.status(400)
        .send({
          message: 'Logout Failed'
        });
   });
});

export default todoRouter;
