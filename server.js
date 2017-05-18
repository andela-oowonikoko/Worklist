import path from 'path';
import express from 'express';
import parser from 'body-parser';
import firebase from 'firebase';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from './webpack.config';

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

if (process.env.NODE_ENV !== 'test') {
  const compiler = webpack(webpackConfig);
  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath
  }));
  app.use(webpackHotMiddleware(compiler));
}
app.get('/app/*', (req, res) => {
  res.sendFile(`${__dirname}/client/dist/index.html`);
});

app.use(parser.urlencoded({ extended: true }));
app.use(parser.json());

app.use('/', route.todoRouter);
app.use(express.static(path.join(__dirname, 'client/dist')));

app.listen(port, () => {
  console.log(`Server started on ${port}`);
});

module.exports = app;
