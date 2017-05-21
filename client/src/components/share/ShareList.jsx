import React, { Component } from 'react';
import NavBar from '../common/NavBar';
import ShareListActions from '../../actions/shareListActions';
import ShareListStore from '../../stores/sharelistStore';

/**
 * @class ShareList
 * @extends {Component}
 */
class ShareList extends Component {
  /**
   * Creates an instance of ShareList.
   * @param {any} props
   * @memberOf ShareList
   */
  constructor(props) {
    super(props);
    this.state = {
      list: ShareListStore.getList(),
      title: ''
    };

    this.onChange = this.onChange.bind(this);
    this.setTitle = this.setTitle.bind(this);
  }

  /**
   * Gets the todolists created by the user
   * @memberOf ShareList
   * @returns {void}
   */
  componentDidMount() {
    const queryParams = this.props.location.search.split('&');
    const uid = queryParams[0].split('=')[1];
    const title = queryParams[1].split('=')[1];
    this.setTitle(title);
    ShareListActions.getsharelist(uid, title);
    ShareListStore.addChangeListener(this.onChange);
  }

  /**
   * Removes the listener on the ShareListStore
   * @memberof ShareList
   * @returns {void}
   */
  componentWillUnmount() {
    ShareListStore.removeChangeListener(this.onChange);
  }

  /**
   * @memberof ShareList
   * @returns {void}
   */
  onChange() {
    this.setState({ list: ShareListStore.getList() });
  }

  /**
   * @param {any} title
   * @returns {void}
   * @memberof ShareList
   */
  setTitle(title) {
    this.setState({ title });
  }

  /**
   * renders the ShareList component
   * @returns {void}
   * @memberOf ShareList
   */
  render() {
    console.log(this.state.list, this.state.title);
    return (
      <NavBar />
    );
  }
}

ShareList.propTypes = {
  location: React.PropTypes.object.isRequired
};

export default ShareList;
