import {Component, EventEmitter} from 'ng-forward';
import FilterLinks from './FilterLinks';

@Component({
  selector: 'footer',
  inputs: ['remainingCount', 'completedCount'],
  outputs: ['clearCompleted'],
  directives: [FilterLinks],
  template:
    `
    <span class="todo-count"><strong>{{footer.remainingCount}}</strong>
      <ng-pluralize count="footer.remainingCount" when="{ one: 'item left', other: 'items left' }"></ng-pluralize>
    </span>
    <filter-links></filter-links>
    <button class="clear-completed" (click)="footer.clearCompleted.next()" ng-show="footer.completedCount">Clear completed</button>
    `
})
export default class Footer {
  constructor() {
    this.clearCompleted = new EventEmitter();
  }
}