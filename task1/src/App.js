import React, { Component } from "react";
import TaskItem from "./TaskItem";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: "",
      tasks: []
    };
  }

  handleInputChange = (event) => {
    this.setState({
      text: event.target.value
    });
  };

  addTask = () => {
    const taskText = this.state.text.trim();

    if (taskText === "") {
      return;
    }

    const newTask = {
      id: Date.now(),
      text: taskText,
      done: false
    };

    this.setState((prevState) => ({
      tasks: [...prevState.tasks, newTask],
      text: ""
    }));
  };

  toggleTask = (id) => {
    this.setState((prevState) => ({
      tasks: prevState.tasks.map((task) =>
        task.id === id
          ? { ...task, done: !task.done }
          : task
      )
    }));
  };

  deleteTask = (id) => {
    this.setState((prevState) => ({
      tasks: prevState.tasks.filter(
        (task) => task.id !== id
      )
    }));
  };

  render() {
    const { text, tasks } = this.state;

    const completedTasks = tasks.filter(
      (task) => task.done
    ).length;

    return (
      <div className="app">
        <h1>My To-Do List</h1>

        <div className="input-section">
          <input
            type="text"
            placeholder="Enter a task..."
            value={text}
            onChange={this.handleInputChange}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                this.addTask();
              }
            }}
          />

          <button onClick={this.addTask}>Add</button>
        </div>

        <p className="counter">
          {completedTasks} of {tasks.length} tasks done
        </p>

        {tasks.length === 0 ? (
          <p className="empty-message">
            No tasks yet. Add one!
          </p>
        ) : (
          <ul className="task-list">
            {tasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onToggle={this.toggleTask}
                onDelete={this.deleteTask}
              />
            ))}
          </ul>
        )}
      </div>
    );
  }
}

export default App;