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
            {(localStorage.getItem('worklist'))
              ?
                <div>
                  <li>
                    {JSON.parse(localStorage.getItem('worklist')).photo
                      ? <img
                        className="profilePic"
                        src={userDetails.photo}
                        alt="profile pic"
                      />
                      : ''
                    }
                  </li>
                  <li>
                    <a href="/app/mylist" id="mylistLink">My List</a>
                  </li>
                  <li>
                    <a href="/app/profile">Profile</a>
                  </li>
                  <li className="logout">
                    <a href="#" onClick={this.onClickLogout}>Logout</a>
                  </li>
                </div>
              :
              ''
            }
          </ul>
        </div>
      </nav>
    );
  }
}

export default NavBar;
