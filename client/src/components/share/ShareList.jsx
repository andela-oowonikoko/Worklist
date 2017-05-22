import React, { Component } from 'react';
import { Modal, Button, Row, Input } from 'react-materialize';
import NavBar from '../common/NavBar';
import AddListActions from '../../actions/addListActions';
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
      title: '',
      userId: '',
      task: '',
      priority: '',
      date: ''
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
    let title = queryParams[1].split('=')[1];
    title = title.split('%20').join(' ');
    this.setTitle(title);
    this.setUserId(uid);
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
   * @param {any} event
   * @returns {object} object
   * @memberOf ShareList
   */
  onChangeEvent(event) {
    return this.setState({ [event.target.name]: event.target.value });
  }

  /**
   * @param {any} event
   * @returns {void}
   * @memberOf ShareList
   */
  onSubmit(event) {
    event.preventDefault();
    const bodyData = {
      title: this.state.title,
      task: this.state.task,
      date: this.state.date,
      priority: this.state.priority,
      userId: this.state.userId
    };
    console.log(bodyData);
    AddListActions.addlist(bodyData);
    window.location = location.href;
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
   * @param {any} userId
   * @returns {void}
   * @memberof ShareList
   */
  setUserId(userId) {
    this.setState({ userId });
  }

  /**
   * renders the ShareList component
   * @returns {void}
   * @memberOf ShareList
   */
  render() {
    return (
      <div>
        <NavBar />
        <div
          className="todoTitle shareListDiv"
        >
          <p className="todoTitlePara">{this.state.title}</p>
          <div className="">
            {Object.keys(this.state.list).map((taskKey, index) => {
              return (
                <div className="" key={index}>
                  {this.state.list[taskKey].content}
                  {this.state.list[taskKey].priority === 'normal' &&
                    <div className="right blue normalDiv taskRight" />}
                  {this.state.list[taskKey].priority === 'urgent' &&
                    <div className="right yellow normalDiv taskRight" />}
                  {this.state.list[taskKey].priority === 'critical' &&
                    <div className="right red normalDiv taskRight" />}
                  <div className="right grey lighten-1 taskRight">
                    {this.state.list[taskKey].date}
                  </div>
                </div>
              );
            })}
          </div>
          <Modal
            header="Add Task"
            trigger={
              <Button
                className="btn-floating waves-effect waves-light red addTask right"
              >
                <i className="material-icons">add</i>
              </Button>}
          >
            <form
              className="col s12"
              method="post"
              onSubmit={event => this.onSubmit(event)}
            >
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
            </form>
          </Modal>
        </div>
      </div>
    );
  }
}

ShareList.propTypes = {
  location: React.PropTypes.object.isRequired
};

export default ShareList;
