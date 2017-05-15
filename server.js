import path from 'path';
import express from 'express';
import parser from 'body-parser';
import firebase from 'firebase';

const route = require('./server/routes');
const dotenv = require('dotenv');

dotenv.config();

const config = {
  apiKey: process.env.APIKEY,
  authDomain: process.env.AUTHDOMAIN,
  databaseURL: process.env.DATABASEURL,
  projectId: process.env.PROJECTID,
  storageBucket: process.env.STORAGEBUCKET,
  messagingSenderId: process.env.MESSAGINGSENDERID
};
firebase.initializeApp(config);

const port = process.env.PORT || 4000;

const app = express();

app.use(parser.urlencoded({ extended: true }));
app.use(parser.json());

app.use('/', route.todoRouter);

app.listen(port, () => {
  console.log(`Server started on ${port}`);
});

module.exports = app;
