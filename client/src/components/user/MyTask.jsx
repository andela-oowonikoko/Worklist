import React, { Component } from 'react';
import { Modal } from 'react-materialize';
import MyTaskContent from './MyTaskContent';
import deleteListActions from '../../actions/DeleteListActions';
import SendMailActions from '../../actions/SendMailActions';

/**
 * @class MyTask
 * @extends {Component}
 */
class MyTask extends Component {
  /**
   * Creates an instance of MyTask.
   * @param {any} props
   * @memberOf MyTask
   */
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.listKey,
      userId: JSON.parse(localStorage.getItem('worklist')).uid,
      email: ''
    };
    this.onDeleteList = this.onDeleteList.bind(this);
  }

  /**
   * @param {any} event
   * @returns {object} object
   * @memberOf MyTask
   */
  onChangeEvent(event) {
    return this.setState({ [event.target.name]: event.target.value });
  }

  /**
   * @param {any} event
   * @returns {void}
   * @memberOf MyTask
   */
  onSubmit(event) {
    event.preventDefault();
    const locationOrigin = location.origin;
    const myLocation = `${locationOrigin}/app/sharelist?uid=${this.state.userId}&title=${this.props.listKey}`;
    const bodyData = {
      email: this.state.email,
      myLocation
    };
    SendMailActions.sendMail(bodyData);
  }

  /**
   * @returns {void}
   * @memberof MyTask
   */
  onDeleteList() {
    const bodyData = {
      title: this.state.title,
      userId: this.state.userId
    };
    deleteListActions.deletelist(bodyData);
    window.location = '/app/mylist';
  }

  /**
   * renders the MyTask component
   * @returns {void}
   * @memberOf MyTask
   */
  render() {
    const locationOrigin = location.origin;
    const myLocation = `${locationOrigin}/app/sharelist?uid=${this.state.userId}&title=${this.props.listKey}`;

    return (
      <div>
        {Object.keys(
          this.props.listsToDisplay[this.props.listKey])
          .map((task, index) => {
            const taskToDisplay =
              this.props.listsToDisplay[this.props.listKey][task];
            return (
              <MyTaskContent
                listsToDisplay={this.props.listsToDisplay}
                listKey={this.props.listKey}
                taskToDisplay={taskToDisplay}
                listIndex={this.props.listIndex}
                taskIndex={index}
                taskKey={task}
                key={task}
                id={`option${index}`}
              />
            );
          })}
        <Modal
          header="Share List"
          trigger={
            <a href={myLocation} >Share</a>}
        >
          <form
            className="col s12"
            method="post"
            onSubmit={event => this.onSubmit(event)}
          >
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              className="todoInput"
              onChange={event => this.onChangeEvent(event)}
              value={this.state.email}
              required
            />
            <button
              className="btn waves-effect waves-light"
              type="submit"
              name="action"
            >
              Send
              <i className="material-icons right">send</i>
            </button>
          </form>
        </Modal>
        <i
          className="material-icons right deleteIcon"
          onClick={this.onDeleteList}
        >
          delete
        </i>
      </div>
    );
  }
}

MyTask.propTypes = {
  listsToDisplay: React.PropTypes.object.isRequired,
  listKey: React.PropTypes.string.isRequired,
  listIndex: React.PropTypes.number.isRequired
};

export default MyTask;
