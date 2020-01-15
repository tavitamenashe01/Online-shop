import React from 'react';
// import Banner from './components/Banner';
// import AddToDo from './todo-components/AddTodo';
// import Filter from './todo-components/Filter';
// import ToDoItem from './todo-components/ToDoItem';
// import ToDoList from './todo-components/ToDoList';

class App extends Component {
  state = {
    todos: [],
    value: '',
    filter: 'all'
  }

  filterFun = (todo) => {
    switch (this.state.filter) {
      case 'done': return todo.done;
      case 'inprogress': return !todo.done;
      default: return true
    }
  }

  

  AddToDo = () => {
    this.setState({
      todos: [
        ...this.state.todos,
        { text: this.state.value, done: false }
      ]
    });
    this.setState({ value: '' });
  }

  handleChange = (value) => {
    this.setState({ value });
  }

  makeDone = (index) => {
    this.setState({
      todos: this.state.todos.map((todo, i) => {
        if (i === index) {
          return { ...todo, done: !todo.done };
        }
        return todo;
      })
    });
  }

  render() {
    return (
      <div>
        <input
          type="text"
          value={this.state.value}
          onChange={(e) => { this.handleChange(e.target.value) }
          } />
        <button onClick={this.AddToDo}>Add</button>
      </div>
      <div>
        <button>All</button>
        <button>Doing</button>
        <button>Done</button>
      </div>
      <ul>
        {this.state.todos.map(
          (todo, i) => 
          <li key={i} style={{textDecoration: todo.done ? "line-through" : "" }}>
          {todo.text}
          <button onClick={() => this.makeDone(i)}>Done</button>
          </li>
        )
        })
      </ul>
        {/* <AddToDo />
        <Filter />
        <ToDoList />
        <ToDoItem /> */}
      // <main>
      //   <section>
      //     <Banner />
      //   </section>
      // </main>
  
  }
}

export default App;
