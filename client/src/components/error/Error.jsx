import React, { Component } from 'react';
import ErrorStore from '../../stores/ErrorStore';

/**
 * @class Error
 * @extends {Component}
 */
class Error extends Component {
    /**
   * Gets the todolists created by the user
   * @memberOf Error
   * @returns {void}
   */
  componentDidMount() {
    ErrorStore.addChangeListener(this.onChange);
  }

  /**
   * Removes the listener on the FetchlistStore
   * @memberof Error
   * @returns {void}
   */
  componentWillUnmount() {
    ErrorStore.removeChangeListener(this.onChange);
  }

  /**
   * @memberof Error
   * @returns {void}
   */
  onChange() {
    Materialize.toast(ErrorStore.getMessage(), 4000, 'rounded');
  }
  /**
   * renders the Error component
   * @returns {void}
   * @memberOf Error
   */
  render() {
    return (
      <div />
    );
  }
}

export default Error;
