import React, { Component } from 'react';
import UpdateListActions from '../../actions/UpdateListActions';

/**
 * @class MyTaskContent
 * @extends {Component}
 */
class MyTaskContent extends Component {
  /**
   * Creates an instance of MyTaskContent.
   * @param {any} props
   * @memberOf MyTaskContent
   */
  constructor(props) {
    super(props);
    this.state = {
      userId: JSON.parse(localStorage.getItem('worklist')).uid,
      title: this.props.listKey,
      taskKey: this.props.taskKey
    };
    this.completeTask = this.completeTask.bind(this);
  }

  /**
   * @returns {void}
   * @memberof MyTaskContent
   */
  completeTask() {
    $(`#option${this.props.listIndex}${this.props.taskIndex}`).toggle();
    const bodyData = {
      userId: this.state.userId,
      title: this.state.title,
      taskKey: this.state.taskKey
    };
    UpdateListActions.updatelist(bodyData);
  }

  /**
   * renders the MyTaskContent component
   * @returns {void}
   * @memberOf MyTaskContent
   */
  render() {
    return (
      <div
        className="todoContents"
        key={this.props.taskIndex}
      >
        {this.props.taskToDisplay.content}
        {this.props.taskToDisplay.complete === false &&
          <button
            type="button"
            className="doneBtn right"
            id={`option${this.props.listIndex}${this.props.taskIndex}`}
            onClick={this.completeTask}
          >
            Done
          </button>}
        {this.props.taskToDisplay.priority === 'normal' &&
          <div className="right blue normalDiv taskRight" />}
        {this.props.taskToDisplay.priority === 'urgent' &&
          <div className="right yellow normalDiv taskRight" />}
        {this.props.taskToDisplay.priority === 'critical' &&
          <div className="right red normalDiv taskRight" />}
        <div className="right grey lighten-1 taskRight">
          {this.props.taskToDisplay.date}
        </div>
      </div>
    );
  }
}

MyTaskContent.propTypes = {
  listsToDisplay: React.PropTypes.object.isRequired,
  taskToDisplay: React.PropTypes.object.isRequired,
  listKey: React.PropTypes.string.isRequired,
  taskKey: React.PropTypes.string.isRequired,
  taskIndex: React.PropTypes.number.isRequired,
  listIndex: React.PropTypes.number.isRequired
};

export default MyTaskContent;
