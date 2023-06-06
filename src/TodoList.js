import React, { Component } from 'react';
import './styles.css';

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      newTodo: '',
    };
  }

  componentDidMount() {
    // Retrieve todos from local storage on component mount
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      this.setState({ todos: JSON.parse(savedTodos) });
    }
  }

  componentDidUpdate() {
    // Save todos to local storage on state update
    localStorage.setItem('todos', JSON.stringify(this.state.todos));
  }

  handleInputChange = (event) => {
    this.setState({ newTodo: event.target.value });
  };

  handleAddTodo = () => {
    const { newTodo, todos } = this.state;
    if (newTodo.trim() !== '') {
      const updatedTodos = [...todos, newTodo];
      this.setState({ todos: updatedTodos, newTodo: '' });
    }
  };

  handleDeleteTodo = (index) => {
    const { todos } = this.state;
    const updatedTodos = [...todos];
    updatedTodos.splice(index, 1);
    this.setState({ todos: updatedTodos });
  };

  render() {
    const { todos, newTodo } = this.state;

    return (
      <div className="container">
        <h2>To-Do List</h2>
        <div className="input-container">
          <input type="text" value={newTodo} onChange={this.handleInputChange} className="input-field" />
          <button onClick={this.handleAddTodo} className="add-button">Add</button>
        </div>
        <ul>
          {todos.map((todo, index) => (
            <li key={index}>
              {todo}
              <button onClick={() => this.handleDeleteTodo(index)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default TodoList;
