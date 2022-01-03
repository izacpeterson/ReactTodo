// localStorage.setItem("todos", '[{"name":"Test 1","complete":false},{"name":"Test 2","complete":false},{"name":"Test 3","complete":false},{"name":"Test 4","complete":false},{"name":"Test 5","complete":false}]');

class Title extends React.Component {
  render() {
    return (
      <header className="bg-rose-500 p-3 text-3xl text-white">
        <h1>React ToDo</h1>
      </header>
    );
  }
}
class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = { newTodo: "", todos: ["test"] };

    this.addTodo = this.addTodo.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  render() {
    return (
      <div>
        <ul>
          {this.state.todos.map((todo) => {
            return (
              <li key={todo.name} className="m-2 p-2 bg-slate-100 flex justify-evenly items-center max-w-xl">
                <h2 className="flex-1">{todo.name}</h2>
                <button
                  onClick={() => {
                    this.toggleTodo(todo.name);
                  }}
                  className="bg-indigo-500 text-white p-1 m-2 w-6 h-6 flex items-center justify-center material-icons"
                >
                  {todo.complete ? "restart_alt" : "done"}
                </button>
                <button
                  onClick={() => {
                    this.deleteTodo(todo.name);
                  }}
                  className="bg-rose-500 text-white p-1 m-2 w-6 h-6 flex items-center justify-center"
                >
                  X
                </button>
              </li>
            );
          })}
        </ul>
        <form onSubmit={this.addTodo}>
          <input type="text" value={this.state.newTodo} onChange={this.handleChange} className="bg-slate-100 p-2 m-2" placeholder="todo"></input>
          <input type="submit" value="Add" className="bg-rose-500 text-white p-2"></input>
        </form>
      </div>
    );
  }
  addTodo(e) {
    e.preventDefault();
    // alert(this.state.newTodo);
    let todos = this.state.todos;
    todos.push({ name: this.state.newTodo, complete: false });
    this.setState({ todos: todos });
    this.saveData();
    this.setState({ newTodo: "" });
  }
  deleteTodo(name) {
    let todos = this.state.todos;
    let index = todos.map((x) => x.name).indexOf(name);
    todos.splice(index, 1);
    this.setState({ todos: todos });
    this.saveData();
    // console.log(this);
  }
  toggleTodo(name) {
    let todos = this.state.todos;
    let index = todos.map((x) => x.name).indexOf(name);
    todos[index].complete = !todos[index].complete;
    this.setState({ todos: todos });
    this.saveData();
  }
  handleChange(e) {
    this.setState({ newTodo: e.target.value });
  }
  componentDidMount() {
    let data = JSON.parse(localStorage.getItem("todos")) || [];
    this.setState({ todos: data });
  }
  saveData() {
    localStorage.setItem("todos", JSON.stringify(this.state.todos));
  }
}

const element = (
  <main>
    <Title></Title>
    <App></App>
  </main>
);

ReactDOM.render(element, document.getElementById("root"));
