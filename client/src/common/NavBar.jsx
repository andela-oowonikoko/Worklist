import React, { Component } from 'react';

/**
 * @class Navbar
 * @extends {Component}
 */
class NavBar extends Component {

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
            <li className="logout">
              {(localStorage.getItem('worklist'))
                ? <a href="/app/logout">Logout</a>
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
