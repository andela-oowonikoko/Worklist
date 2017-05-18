import express from 'express';
import firebase from 'firebase';

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
      return res.status(409)
        .send({
          message: error.code,
          errorMessage: error.message
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

todoRouter.post('/login', (req, res) => {
  if (req.body.password && req.body.email) {
    const email = req.body.email;
    const password = req.body.password;

    firebase.auth().signInWithEmailAndPassword(email, password)
    .then((data) => {
      res.status(200)
        .send({
          message: 'You have succesfully signed in',
          data: data.uid
        });
    })
    .catch((error) => {
      return res.status(400)
        .send({
          message: error.message,
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

todoRouter.post('/createtask', (req, res) => {
  const userId = req.body.userId;
  const title = req.body.title;
  const task = req.body.task;
  const dueDate = req.body.date;
  const complete = req.body.complete || false;
  const priority = req.body.priority || 'normal';

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
