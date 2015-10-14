/* global localStorage */
export class Todo {
  completed: Boolean;
  title: String;
  constructor(title: String, completed = false) {
    this.completed = completed;
    this.title = title.trim();
  }
}

export class TodoStore {

  todos: Array<Todo>;

  constructor() {
    // Load the todos from local storage
    let persistedTodos = JSON.parse(localStorage.getItem('todos') || '[]');
    this.todos = persistedTodos.map( (todo) => {
      return new Todo(todo.title, todo.completed);
    });
  }

  countCompleted() {
    let count = this.todos.reduce((count, todo) => todo.completed ? count + 1 : count, 0);
    return count;
  }

  allCompleted() {
    return this.todos.length === this.countCompleted();
  }

  countRemaining() {
    return this.todos.length - this.countCompleted();
  }

  setAllTo(completed) {
    this.todos.forEach((t: Todo) => t.completed = completed);
    this.save();
  }

  removeCompleted() {
    this.todos = this.todos.filter((todo: Todo) => !todo.completed);
    this.save();
  }

  remove(todoToRemove: Todo) {
    this.todos = this.todos.filter((todo: Todo) => todoToRemove !== todo);
    this.save();
  }

  add(title: String, completed: boolean) {
    this.todos.push(new Todo(title, completed));
    this.save();
  }

  save() {
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }
}