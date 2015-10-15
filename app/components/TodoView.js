import {Component, View, EventEmitter} from 'ng-forward';

@Component({
  selector: 'todo-view',
  inputs: ['todo'],
  outputs: ['titleChange', 'completedChange', 'remove']
  template:
  `
  <div class="view">
    <input class="toggle" type="checkbox" ng-model="todoView.todo.completed" ng-change="todoView.completedChange.next()">
    <label (dblclick)="todoView.todo.editing = true" ng-hide="todoView.todo.editing">{{todoView.todo.title}}</label>
    <button class="destroy" (click)="todoView.remove.next()"></button>
  </div>
  <text-editor
      ng-show="todoView.todo.editing"
      [focus-on]="todoView.todo.editing"
      (start)="todoView.saveOriginal()"
      (end)="todoView.updateTitle()"
      (enter)="todoView.updateTitle()"
      (abort)="todoView.resetTodo()"
      [(value)]="todoView.todo.title"
      input-classes="edit"></text-editor>
  `
})
export default class TodoView {
  constructor() {
    this.titleChange = new EventEmitter();
    this.completedChange = new EventEmitter();
    this.remove = new EventEmitter();
  }

  updateTitle() {
    this.titleChange.next();
    this.todo.editing = false;
  }

  saveOriginal() {
    this.originalTitle = this.todo.title;
  }

  resetTodo() {
    this.todo.title = this.originalTitle;
    this.todo.editing = false;
  }
}