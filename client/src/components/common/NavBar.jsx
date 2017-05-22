import React, { Component } from 'react';

/**
 * @class Navbar
 * @extends {Component}
 */
class NavBar extends Component {
  /**
   * @returns {void}
   * @memberof NavBar
   */
  onClickLogout() {
    localStorage.clear();
    window.location = '/app/login';
  }

  /**
   * renders the Nav component
   * @returns {void}
   * @memberOf Navbar
   */
  render() {
    const userDetails = JSON.parse(localStorage.getItem('worklist'));
    return (
      <nav>
        <div className="nav-wrapper">
          <div className="brand-logo">Worklist</div>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li>
              {(localStorage.getItem('worklist'))
                ? <img
                  className="profilePic"
                  src={userDetails.photo}
                  alt="profile pic"
                />
                : ''
              }
            </li>
            <li>
              {(localStorage.getItem('userId'))
                ? <a href="/app/profile">Profile</a>
                : ''
              }
            </li>
            <li className="logout">
              {(localStorage.getItem('userId'))
                ? <a href="#" onClick={this.onClickLogout}>Logout</a>
                : ''
              }
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default NavBar;
