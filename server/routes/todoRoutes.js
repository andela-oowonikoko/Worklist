import express from 'express';
import firebase from 'firebase';

const todoRouter = express.Router();

todoRouter.route('/')
  .get((req, res) => {
    res.status(200).send("{ message: 'Welcome to Worklist API' }");
  });

todoRouter.get('/login', (req, res) => {
  const provider = new firebase.auth.GoogleAuthProvider();

  firebase.auth()
  .signInWithPopup(provider).then((result) => {
    const token = result.credential.accessToken;
    const user = result.user;

    console.log('token', token);
    console.log('user', user);
  }).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;

    console.log('error code', errorCode);
    console.log('error message', errorMessage);
  });
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
