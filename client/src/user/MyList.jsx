import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../common/NavBar';

/**
 * @class MyList
 * @extends {Component}
 */
class MyList extends Component {

  /**
   * renders the MyList component
   * @returns {void}
   * @memberOf MyList
   */
  render() {
    return (
      <div>
        <NavBar />
        <Link
          className="btn-floating btn-large waves-effect waves-light red addList right"
          to="/app/createlist"
        >
          <i className="material-icons">add</i>
        </Link>
      </div>
    );
  }
}

export default MyList;
