import React, { Component } from 'react';
import SuccessStore from '../../stores/successStore';

/**
 * @class Success
 * @extends {Component}
 */
class Success extends Component {
    /**
   * Gets the todolists created by the user
   * @memberOf Success
   * @returns {void}
   */
  componentDidMount() {
    SuccessStore.addChangeListener(this.onChange);
  }

  /**
   * Removes the listener on the FetchlistStore
   * @memberof Success
   * @returns {void}
   */
  componentWillUnmount() {
    SuccessStore.removeChangeListener(this.onChange);
  }

  /**
   * @memberof Success
   * @returns {void}
   */
  onChange() {
    Materialize.toast(SuccessStore.getMessage(), 4000, 'rounded');
  }
  /**
   * renders the Success component
   * @returns {void}
   * @memberOf Success
   */
  render() {
    return (
      <div />
    );
  }
}

export default Success;
