import React, { Component } from 'react';
import MyTaskContent from './MyTaskContent';
import deleteListActions from '../../actions/DeleteListActions';

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
      userId: localStorage.getItem('userId'),
    };
    this.onDeleteList = this.onDeleteList.bind(this);
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
    let myLocation = location.href.split('/');
    myLocation[4] =
      `sharelist?uid=${this.state.userId}&title=${this.props.listKey}`;
    myLocation = myLocation.join('/');

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
                key={index}
                id={`option${index}`}
              />
            );
          })}
        <a href={myLocation} >Share</a>
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
