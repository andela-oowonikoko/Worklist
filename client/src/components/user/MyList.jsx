import React, { Component } from 'react';
import Mytask from './MyTask';
import AddTodo from './AddTodo';
import NavBar from '../common/NavBar';
import FetchlistStore from '../../stores/FetchlistStore';


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
   * renders the MyList component
   * @returns {void}
   * @memberOf MyList
   */
  render() {
    const listsToDisplay = this.state.lists;
    const emptyMessage = (
      <p className="noListPara">You do not have any todo lists yet</p>
    );

    return (
      <div>
        <NavBar />
        <AddTodo />
        {listsToDisplay === null ? emptyMessage :
        <div className="myLists">
          {Object.keys(listsToDisplay).map((listKey, index) => {
            return (
              <div className="todoTitle" key={index}>
                <p className="todoTitlePara" id={index}>{listKey}</p>
                <Mytask
                  listsToDisplay={listsToDisplay}
                  listKey={listKey}
                  listIndex={index}
                />
              </div>
            );
          })}
        </div>}
      </div>
    );
  }
}

export default MyList;
