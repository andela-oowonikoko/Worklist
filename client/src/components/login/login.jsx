import React from 'react';
import firebase from '../../firebaseConfig';
import NavBar from '../common/NavBar';
import AuthenticationActions from '../../actions/AuthenticationActions';
import AuthenticationStore from '../../stores/AuthenticationStore';

/**
 * Displays the Login Page
 * @class Login
 * @extends {React.Component}
 */
export default class Login extends React.Component {
  /**
   * Creates an instance of Login.
   * @param {any} props
   * @memberOf Login
   */
  constructor(props) {
    super(props);
    this.state = {
      userId: '',
      resetPWD: false,
      email: '',
      password: ''
    };
    this.onChange = this.onChange.bind(this);
    this.signup = this.signup.bind(this);
    this.login = this.login.bind(this);
    this.resetPassword = this.resetPassword.bind(this);
  }

  /**
   * Sets the Firebase Login User Configuration
   * @memberOf Login
   * @returns {void}
   */
  componentDidMount() {
    AuthenticationStore.addChangeListener(this.onChange);

    $('#signupDiv').hide();

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
          const firebaseDetails = JSON.parse(
            localStorage.getItem('firebaseui::rememberedAccounts'));

          localStorage.setItem('worklist', userDetails);
          localStorage.setItem('userId', JSON.parse(userDetails).uid);
          localStorage.setItem('email', firebaseDetails[0].email);
          return true;
        },
      },
    };

    // Initialize the Google Login Button
    const googleLoginButton = new firebaseui.auth.AuthUI(firebase.auth());
    googleLoginButton.start('#firebaseui-container', googleLoginConfiguration);
  }

  /**
   * Removes the listener on the FetchlistStore
   * @memberof Login
   * @returns {void}
   */
  componentWillUnmount() {
    AuthenticationStore.removeChangeListener(this.onChange);
  }

  /**
   * @memberof Login
   * @returns {void}
   */
  onChange() {
    this.setState({ userId: AuthenticationStore.getUserId() });
    this.setState({ resetPWD: AuthenticationStore.getResetMessage() });

    if (this.state.userId) {
      localStorage.setItem('userId', this.state.userId);
      window.location = '/app/mylist';
    }
  }

  /**
   * @param {any} event
   * @returns {object} object
   * @memberOf Login
   */
  onChangeEvent(event) {
    return this.setState({ [event.target.name]: event.target.value });
  }

  /**
   * @returns {void}
   * @memberof Login
   */
  signup() {
    const bodyData = {
      email: this.state.email,
      password: this.state.password
    };
    localStorage.setItem('email', bodyData.email);
    AuthenticationActions.signup(bodyData);
  }

  /**
   * @returns {void}
   * @memberof Login
   */
  login() {
    const bodyData = {
      email: this.state.email,
      password: this.state.password
    };
    localStorage.setItem('email', bodyData.email);
    AuthenticationActions.login(bodyData);
  }

  /**
   * @returns {void}
   * @memberof Login
   */
  resetPassword() {
    const bodyData = {
      email: this.state.email,
    };
    AuthenticationActions.resetPassword(bodyData);
  }

  /**
   * @returns {void}
   * @memberof Login
   */
  showSignupForm() {
    $('#signupDiv').show();
    $('#loginDiv').hide();
  }

  /**
   * @returns {void}
   * @memberof Login
   */
  showLoginForm() {
    $('#signupDiv').hide();
    $('#loginDiv').show();
  }

  /**
   * Renders the full login page
   * @returns {button} The Google login button
   * @memberOf Login
   */
  render() {
    return (
      <div>
        <NavBar />
        <div className="container-fluid login-page">
          <div className="container" id="loginDiv">
            <div className="row">
              <div className="col s12" />
            </div>

            <div className="row">
              <div className="input-field col s12">
                <input
                  className="validate"
                  type="email"
                  name="email"
                  id="email"
                  onChange={event => this.onChangeEvent(event)}
                  required
                />
                <label htmlFor="email">Enter your email</label>
              </div>
            </div>

            <div className="row">
              <div className="input-field col s12">
                <input
                  className="validate"
                  type="password"
                  name="password"
                  id="password"
                  onChange={event => this.onChangeEvent(event)}
                  required
                />
                <label htmlFor="password">Enter your password</label>
              </div>
              <label id="forgotPasswordDiv" htmlFor="forgotPassword">
                <a
                  className="pink-text right"
                  href="#!"
                  onClick={this.resetPassword}
                >
                  <b>Forgot Password?</b>
                </a>
              </label>
            </div>

            <br />
            <center>
              <div className="row">
                <button
                  type="submit"
                  name="btn_login"
                  id="btnLogin"
                  className="col s12 btn btn-large waves-effect red lighten-2"
                  onClick={this.login}
                >
                  Login
                </button>
              </div>
            </center>
            <a
              href="#!"
              className="right"
              id="signupForm"
              onClick={this.showSignupForm}
            >
              Create account
            </a>
          </div>

          <div className="container" id="signupDiv">
            <div className="row">
              <div className="col s12" />
            </div>

            <div className="row">
              <div className="input-field col s12">
                <input
                  className="validate"
                  type="email"
                  name="email"
                  id="signupEmail"
                  onChange={event => this.onChangeEvent(event)}
                  required
                />
                <label htmlFor="email">Enter your email</label>
              </div>
            </div>

            <div className="row">
              <div className="input-field col s12">
                <input
                  className="validate"
                  type="password"
                  name="password"
                  id="signupPassword"
                  onChange={event => this.onChangeEvent(event)}
                  required
                />
                <label htmlFor="password">Enter your password</label>
              </div>
            </div>

            <br />
            <center>
              <div className="row">
                <button
                  type=""
                  name="btn_login"
                  className="col s12 btn btn-large waves-effect red lighten-2"
                  id="btnSignup"
                  onClick={this.signup}
                >
                  Signup
                </button>
              </div>
            </center>
            <a
              href="#!"
              className="right"
              id="loginForm"
              onClick={this.showLoginForm}
            >
              Login
            </a>
          </div>
          <div id="firebaseui-container" />
        </div>
      </div>
    );
  }
}

