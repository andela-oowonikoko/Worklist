import express from 'express';
import firebase from 'firebase';

const todoRouter = express.Router();

todoRouter.route('/')
  .get((req, res) => {
    res.status(200).send("{ message: 'Welcome to Worklist API' }");
  });

todoRouter.get('/users/', (req, res) => {
  const userId = req.query.q;
  const dataToReturn = [];
  const worklistRef = firebase.database().ref(`${userId}/`);

  worklistRef.orderByKey().on('child_added', (data) => {
    dataToReturn.push(data.key);
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
  const priority = req.body.priority || 'normal';

  if (userId && title && task && priority) {
    const worklistRef = firebase.database().ref(`${userId}/${title}`);

    if (priority.toLowerCase() === 'normal' ||
      priority.toLowerCase() === 'urgent' ||
      priority.toLowerCase() === 'critical') {
      worklistRef.push({
        content: task,
        priority,
        complete: false
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

todoRouter.get('/signout', (req, res) => {
  firebase.auth().signOut()

   .then(() => {
     console.log('Signout Succesfull');
   }, (error) => {
     console.log('Signout Failed');
   });
});

export default todoRouter;
