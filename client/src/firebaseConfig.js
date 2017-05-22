import * as firebase from 'firebase';

require('dotenv').config;

/**
 * The configuration for Google Authentication by Firebase
 * @returns the firebase configuration object
 */
const config = {
  apiKey: process.env.APIKEY,
  authDomain: process.env.AUTHDOMAIN,
  databaseURL: process.env.DATABASEURL,
  projectId: process.env.PROJECTID,
  storageBucket: process.env.STORAGEBUCKET,
  messagingSenderId: process.env.MESSAGINGSENDERID,
};
firebase.initializeApp(config);
export default firebase;
