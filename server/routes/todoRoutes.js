import express from 'express';
import nodemailer from 'nodemailer';
import firebase from 'firebase';
import { dateFrom } from '../util/helper';
import cronJob from '../util/cronjob';

const todoRouter = express.Router();

/**
 * Fetches todo lists belonging to a user
 * GET /users/?q={userId}
 * @returns {object} object
 */
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

/**
 * Creates a user
 * POST /users
 * @returns {string} user Id
 */
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

/**
 * Reset a user's password
 * POST /resetPassword
 * @returns {string} message
 */
todoRouter.post('/resetPassword', (req, res) => {
  if (req.body.email) {
    const email = req.body.email;

    firebase.auth().sendPasswordResetEmail(email).then(() => {
      res.status(200)
        .send({
          message: 'Reset password email sent succesfully'
        });
    }, (error) => {
      res.status(404)
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

/**
 * Logs a user in
 * POST /login
 * @returns {string} user Id
 */
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
      switch (error.code) {
        case 'auth/user-not-found':
          return res.status(400)
          .send({
            message: 'This email is not registered, please sign up',
            errorCode: error.code
          });
        case 'auth/wrong-password':
          return res.status(400)
          .send({
            message: 'Your password is invalid',
            errorCode: error.code
          });
        case 'auth/network-request-failed':
          return res.status(400)
          .send({
            message: 'Check your internet',
            errorCode: error.code
          });
        default:
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

/**
 * Deletes a list
 * POST /deletelist
 * @returns {string} message
 */
todoRouter.post('/deletelist', (req, res) => {
  const userId = req.body.userId;
  const title = req.body.title;

  const worklistRef = firebase.database().ref(`${userId}/${title}`);
  worklistRef.remove();

  return res.status(200)
    .send({
      message: 'Your list has been deleted',
    });
});

/**
 * Shares a user's list
 * GET /sharelist/?uid={userId}&title={title}
 * @returns {object} data
 */
todoRouter.get('/sharelist/', (req, res) => {
  const userId = req.query.uid;
  const title = req.query.title;

  const worklistRef = firebase.database().ref(`${userId}/${title}`);

  worklistRef.once('value').then((snapshot) => {
    res.status(200)
      .send({
        message: 'Your ToDo List',
        data: snapshot.val()
      });
  });
});

/**
 * Creates a new task for a user
 * POST /createtask
 * @returns {string} message
 */
todoRouter.post('/createtask', (req, res) => {
  const userId = req.body.userId;
  const title = req.body.title;
  const task = req.body.task;
  const dueDate = req.body.date;
  const complete = req.body.complete || false;
  const priority = req.body.priority || 'normal';
  const email = req.body.email;

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

      if (email) {
        cronJob(dateFrom(dueDate), task, email);
      }

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

/**
 * Updates a user's list
 * POST /updatelist
 * @returns {string} message
 */
todoRouter.post('/updatelist', (req, res) => {
  const userId = req.body.userId;
  const title = req.body.title;
  const taskKey = req.body.taskKey;

  if (userId && title && taskKey) {
    const worklistRef = firebase.database()
      .ref(`${userId}/${title}/${taskKey}`);

    worklistRef.update({
      complete: true
    });

    return res.status(200)
      .send({
        message: 'Your task is done'
      });
  } else {
    if (!title) {
      return res.status(400)
        .send({
          message: 'Enter a valid title'
        });
    }
    if (!taskKey) {
      return res.status(400)
        .send({
          message: 'Enter a valid taskKey'
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

/**
 * Logs a user out
 * POST /logout
 * @returns {string} message
 */
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

/**
 * Sends email to a user
 * POST /sendmail
 * @returns {string} message
 */
todoRouter.post('/sendmail', (req, res) => {
  const email = req.body.email;
  const myLocation = req.body.myLocation;

  if (email && myLocation) {
    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL,
        pass: process.env.GMAIL_PASS
      }
    });

    // setup email data with unicode symbols
    const mailOptions = {
      from: '"Worklist 👻" <no-reply@worklist.com>', // sender address
      to: email, // list of receivers
      subject: 'Collaborate on TODO list', // Subject line
      html: `<p><b>Hello Friend, </b><br />
        You have been invited to contribute to a todo list, click the link below: <br />
          <i><u>${myLocation}</u></p>` // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        return res.status(400)
          .send({
            message: 'Unsuccessful! Email was not sent'
          });
      }
      console.log('Message %s sent: %s', info.messageId, info.response);
      return res.status(200)
        .send({
          message: 'Email has been sent'
        });
    });
  } else {
    if (!email) {
      return res.status(400)
        .send({
          message: 'Enter a valid email'
        });
    }
    if (!myLocation) {
      return res.status(400)
        .send({
          message: 'Enter a valid myLocation'
        });
    }
  }
});

export default todoRouter;
