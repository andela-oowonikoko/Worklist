import React, { Component } from 'react';
import { Modal, Button, Row, Input } from 'react-materialize';
import AddListActions from '../../actions/AddListActions';


/**
 * @class AddTodo
 * @extends {Component}
 */
class AddTodo extends Component {
  /**
   * Creates an instance of AddTodo.
   * @param {any} props
   * @memberOf AddTodo
   */
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      task: '',
      date: '',
      priority: '',
      complete: false
    };
  }

  /**
   * @param {any} event
   * @returns {object} object
   * @memberOf AddTodo
   */
  onChangeEvent(event) {
    return this.setState({ [event.target.name]: event.target.value });
  }

  /**
   * @param {any} event
   * @returns {void}
   * @memberOf AddTodo
   */
  onSubmit(event) {
    event.preventDefault();
    const bodyData = {
      title: this.state.title,
      task: this.state.task,
      complete: this.state.complete,
      date: this.state.date,
      priority: this.state.priority,
      email: JSON.parse(localStorage.getItem('worklist')).email,
      userId: JSON.parse(localStorage.getItem('worklist')).uid
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
   * @memberof AddTodo
   */
  onClickDone() {
    window.location = '/app/mylist';
  }

  /**
   * renders the AddTodo component
   * @returns {void}
   * @memberOf AddTodo
   */
  render() {
    return (
      <div>
        <Modal
          header="Add TODO List"
          trigger={
            <Button
              className="btn-floating btn-large waves-effect waves-light red addList right"
              id="btnAddTask"
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
      </div>
    );
  }
}

export default AddTodo;
