import React, { Component } from 'react';
import firebase from '../../firebaseConfig';
import NavBar from '../common/NavBar';

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
      fileExtension: ''
    };

    this.onChange = this.onChange.bind(this);
    this.uploadPicture = this.uploadPicture.bind(this);
  }

  /**
   * @param {any} event
   * @returns {object} object
   * @memberOf Profile
   */
  onChange(event) {
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
            onChange={this.onChange}
          />
          <button
            onClick={this.uploadPicture}
          >
            Upload
          </button>
        </div>
      </div>
    );
  }
}

export default Profile;
