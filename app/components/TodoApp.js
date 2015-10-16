import {Inject, Component} from 'ng-forward';
import {TodoStore} from '../services/TodoStore';
import Footer from './Footer';
import TextEditor from './TextEditor';
import TodoView from './TodoView';


@Component({
  selector: 'todo-app',
  bindings: [TodoStore],
  directives: [TextEditor, TodoView, Footer],
  template: require('./TodoApp.html')
})
@Inject(TodoStore, '$location')
export default class TodoApp {

  todoStore: TodoStore;
  newTodoTitle: string;

  constructor(todoStore, $location) {
    this.$location = $location;
    this.todoStore = todoStore;
    this.newTodoTitle = '';
  }

  addTodo() {
    let newTodoTitle = this.newTodoTitle && this.newTodoTitle.trim();
    if (newTodoTitle) {
      this.todoStore.add(newTodoTitle);
      this.newTodoTitle = '';
    }
  }

  getFilteredTodos() {
    switch(this.$location.path()) {
      case '/completed':
        return this.todoStore.todos.filter(todo => todo.completed);
      case '/active':
        return this.todoStore.todos.filter(todo => !todo.completed);
      default:
        return this.todoStore.todos;
    }
  }
}