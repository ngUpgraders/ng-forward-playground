import {Component, View, EventEmitter} from 'ng-forward';
import Filters from './Filters';

@Component({
  selector: 'footer',
  properties: ['status', 'remainingCount', 'completedCount'],
  events: ['clearCompleted']
})
@View({
  directives: [Filters],
  template:
    `
    <span class="todo-count"><strong>{{footer.remainingCount}}</strong>
      <ng-pluralize count="footer.remainingCount" when="{ one: 'item left', other: 'items left' }"></ng-pluralize>
    </span>
    <filters [status]="footer.status"></filters>
    <button class="clear-completed" ng-click="footer.clearCompleted.next()" ng-show="footer.completedCount">Clear completed</button>
    `
})
export default class Footer {
  constructor() {
    this.clearCompleted = new EventEmitter();
  }
}