import React, { Component } from 'react';
import { Modal, Button, Row, Input } from 'react-materialize';
import NavBar from '../common/NavBar';
import FetchlistStore from '../../stores/fetchlistStore';
import AddListActions from '../../actions/addListActions';


/**
 * @class MyList
 * @extends {Component}
 */
class MyList extends Component {
  /**
   * Creates an instance of MyList.
   * @param {any} props
   * @memberOf MyList
   */
  constructor(props) {
    super(props);
    this.state = {
      lists: FetchlistStore.getAllLists(),
      title: '',
      task: '',
      date: '',
      priority: '',
      complete: false
    };

    this.onChange = this.onChange.bind(this);
  }

  /**
   * Gets the todolists created by the user
   * @memberOf Mylist
   * @returns {void}
   */
  componentDidMount() {
    FetchlistStore.addChangeListener(this.onChange);
  }

  /**
   * Removes the listener on the FetchlistStore
   * @memberof MyList
   * @returns {void}
   */
  componentWillUnmount() {
    FetchlistStore.removeChangeListener(this.onChange);
  }

  /**
   * @memberof MyList
   * @returns {void}
   */
  onChange() {
    this.setState({ lists: FetchlistStore.getAllLists() });
  }

  /**
   * @param {any} event
   * @returns {object} object
   * @memberOf MyList
   */
  onChangeEvent(event) {
    return this.setState({ [event.target.name]: event.target.value });
  }

  /**
   * @param {any} event
   * @returns {void}
   * @memberOf MyList
   */
  onSubmit(event) {
    event.preventDefault();
    const bodyData = {
      title: this.state.title,
      task: this.state.task,
      complete: this.state.complete,
      date: this.state.date,
      priority: this.state.priority,
      email: localStorage.getItem('email'),
      userId: localStorage.getItem('userId')
    };
    AddListActions.addlist(bodyData);
    $('#appendTask').append(
      `<p>Task: ${this.state.task}<p>`
    );
    this.setState({
      task: ''
    });
    Materialize.toast('Your task has been added', 4000, 'rounded');
  }

  /**
   * @returns {void}
   * @memberof MyList
   */
  onClickDone() {
    window.location = '/app/mylist';
  }

  /**
   * renders the MyList component
   * @returns {void}
   * @memberOf MyList
   */
  render() {
    const listsToDisplay = this.state.lists;

    return (
      <div>
        <NavBar />
        <Modal
          header="Add TODO List"
          trigger={
            <Button
              className="btn-floating btn-large
              waves-effect waves-light red addList right"
            >
              <i className="material-icons">add</i>
            </Button>}
        >
          <form
            className="col s12"
            method="post"
            onSubmit={event => this.onSubmit(event)}
          >
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              className="todoInput"
              id="title"
              onChange={event => this.onChangeEvent(event)}
              value={this.state.title}
              required
            />
            <br />
            <div id="appendTask" />
            <label htmlFor="task">Task</label>
            <input
              type="text"
              name="task"
              className="todoInput"
              id="task"
              value={this.state.task}
              onChange={event => this.onChangeEvent(event)}
              required
            />
            <br />
            <Row>
              <Input
                s={6}
                type="date"
                name="date"
                className="todoInput"
                id="date"
                onChange={event => this.onChangeEvent(event)}
                value={this.state.date}
                required
              />
              <Input
                s={6}
                validate
                type="select"
                name="priority"
                className="todoInput"
                id="priority"
                onChange={event => this.onChangeEvent(event)}
                value={this.state.priority}
              >
                <option value="normal">Normal</option>
                <option value="urgent">Urgent</option>
                <option value="critical">Critical</option>
              </Input>
            </Row>
            <button
              className="btn waves-effect waves-light"
              type="submit"
              name="action"
            >
              Add Task
              <i className="material-icons right">send</i>
            </button>
            <button
              className="btn waves-effect waves-light right"
              type="submit"
              name="action"
              onClick={this.onClickDone}
            >
              Done
            </button>
          </form>
        </Modal>
        <div className="myLists">
          {Object.keys(listsToDisplay).map((key, index) => {
            return (
              <div className="todoTitle" key={index}>
                <p className="todoTitlePara" id={index}>{key}</p>
                {Object.keys(listsToDisplay[key]).map((task, secondIndex) => {
                  const taskToDisplay = listsToDisplay[key][task];
                  return (
                    <div
                      key={secondIndex}
                      className="todoContents"
                      id={secondIndex}
                    >
                      {taskToDisplay.content}
                      {taskToDisplay.priority === 'normal' &&
                        <div className="right blue normalDiv taskRight" />}
                      {taskToDisplay.priority === 'urgent' &&
                        <div className="right yellow normalDiv taskRight" />}
                      {taskToDisplay.priority === 'critical' &&
                        <div className="right red normalDiv taskRight" />}
                      <div className="right grey lighten-1 taskRight">
                        {taskToDisplay.date}
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default MyList;
