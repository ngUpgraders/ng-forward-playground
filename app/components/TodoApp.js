import {Inject, Component} from 'ng-forward';
import {TodoStore} from '../services/TodoStore';
import Footer from './Footer';
import TextEditor from './TextEditor';
import TodoView from './TodoView';
import Filters from '../services/Filters';

@Component({
  selector: 'todo-app',
  providers: [TodoStore, Filters],
  directives: [TextEditor, TodoView, Footer],
  template: require('./TodoApp.html')
})
@Inject(TodoStore, Filters)
export default class TodoApp {

  todoStore: TodoStore;
  newTodoTitle: string;

  constructor(todoStore, filters) {
    this.filters = filters;
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
    return this.todoStore.todos.filter(this.filters.current());
  }
}