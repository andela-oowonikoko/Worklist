import React from 'react';
import firebase from '../../firebaseConfig';
import NavBar from '../common/NavBar';

/**
 * Displays the Login Page
 * @class Login
 * @extends {React.Component}
 */
export default class Login extends React.Component {

  /**
   * Sets the Firebase Login User Configuration
   * @memberOf Login
   */
  componentDidMount() {
    const googleLoginConfiguration = {
      signInFlow: 'popup',
      signInSuccessUrl: '/app/mylist',
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      ],
      tosUrl: 'https://www.google.com',
      callbacks: {
        signInSuccess: (user) => {
          const userDetails = JSON.stringify(
            {
              uid: user.uid,
              name: user.displayName,
              photo: user.photoURL,
            },
          );
          localStorage.setItem('worklist', userDetails);
          return true;
        },
      },
    };

    // Initialize the Google Login Button
    const googleLoginButton = new firebaseui.auth.AuthUI(firebase.auth());
    googleLoginButton.start('#firebaseui-container', googleLoginConfiguration);
  }

  /**
   * Renders the full login page
   * @returns The Google login button
   * @memberOf Login
   */
  render() {
    return (
      <div>
        <NavBar />
        <div className="container-fluid login-page">
          <div className="content" />
          <div id="firebaseui-container" />
        </div>
      </div>
    );
  }
}

