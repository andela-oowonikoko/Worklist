import React, { Component } from 'react';
import firebase from '../../firebaseConfig';
import NavBar from '../common/NavBar';
import AuthenticationActions from '../../actions/AuthenticationActions';

/**
 * @class Profile
 * @extends {Component}
 */
class Profile extends Component {
  /**
   * Creates an instance of Profile.
   * @param {any} props
   * @memberOf Profile
   */
  constructor(props) {
    super(props);
    this.state = {
      fileUploaded: '',
      fileExtension: '',
      email: ''
    };

    this.onChangeFile = this.onChangeFile.bind(this);
    this.uploadPicture = this.uploadPicture.bind(this);
    this.resetPassword = this.resetPassword.bind(this);
  }

  /**
   * @param {any} event
   * @returns {object} object
   * @memberOf Profile
   */
  onChangeEvent(event) {
    return this.setState({ [event.target.name]: event.target.value });
  }

  /**
   * @param {any} event
   * @returns {object} object
   * @memberOf Profile
   */
  onChangeFile(event) {
    const fileUploaded = event.target.files[0];

    if (fileUploaded) {
      const fileArray = fileUploaded.name.split(' ');
      const fileArrayLength = fileArray.length - 1;
      const fileExtension = fileArray[fileArrayLength].split('.')[1];
      this.setState({ fileUploaded, fileExtension });
    }
  }

  /**
   * @returns {void}
   * @memberof Profile
   */
  resetPassword() {
    if (this.state.email !== '') {
      const bodyData = {
        email: this.state.email,
      };
      AuthenticationActions.resetPassword(bodyData);
    } else {
      Materialize.toast('Enter a valid email', 4000, 'rounded');
    }
  }

  /**
   * @returns {void}
   * @memberof Profile
   */
  uploadPicture() {
    const reader = new FileReader();
    const userId = localStorage.getItem('userId');
    const fileExtension = this.state.fileExtension;

    if (this.state.fileUploaded !== '') {
      reader.onload = function(event) {
        const storageRef = firebase.storage().ref('/images');
        const imageRef = storageRef.child(`${userId}.${fileExtension}`);
        imageRef.putString(event.target.result, 'data_url')
          .then(() => {
            Materialize.toast('Upload succesful', 4000, 'rounded');
          }).catch((error) => {
            console.log('error', error);
          });
      };

      reader.readAsDataURL(this.state.fileUploaded);
    }
  }

  /**
   * renders the Profile component
   * @returns {void}
   * @memberOf Profile
   */
  render() {
    return (
      <div>
        <NavBar />
        <div className="profileDiv center">
          <div className="profilePic" id="profilePicDiv" />
          <input
            type="file"
            id="pictureChosen"
            onChange={this.onChangeFile}
          />
          <button
            onClick={this.uploadPicture}
          >
            Upload
          </button>
          <div className="forgotDiv center">
            <p>Reset Password</p>
            <div className="row">
              <center>
                <div className="input-field col s6">
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
                <div className="row">
                  <button
                    type=""
                    name="btn_login"
                    className="col s3 btn waves-effect red lighten-2"
                    onClick={this.resetPassword}
                  >
                    Reset Password
                  </button>
                </div>
              </center>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
