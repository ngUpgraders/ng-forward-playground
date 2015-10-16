import {Component, EventEmitter} from 'ng-forward';
import Filters from './Filters';

@Component({
  selector: 'footer',
  inputs: ['status', 'remainingCount', 'completedCount'],
  outputs: ['clearCompleted'],
  directives: [Filters],
  template:
    `
    <span class="todo-count"><strong>{{footer.remainingCount}}</strong>
      <ng-pluralize count="footer.remainingCount" when="{ one: 'item left', other: 'items left' }"></ng-pluralize>
    </span>
    <filters [status]="footer.status"></filters>
    <button class="clear-completed" (click)="footer.clearCompleted.next()" ng-show="footer.completedCount">Clear completed</button>
    `
})
export default class Footer {
  constructor() {
    this.clearCompleted = new EventEmitter();
  }
}