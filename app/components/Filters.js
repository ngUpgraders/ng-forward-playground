import {Component, View} from 'ng-forward';

@Component({
  selector: 'filters',
  properties: ['status']
})
@View({
  template:
    `
    <ul class="filters">
      <li><a ng-class="{selected: filters.status == ''}" href="#/">All</a></li>
      <li><a ng-class="{selected: filters.status == 'active'}" href="#/active">Active</a></li>
      <li><a ng-class="{selected: filters.status == 'completed'}" href="#/completed">Completed</a></li>
    </ul>
    `
})
export default class Filters {
}