import {Inject, Component} from 'ng-forward';
import Filters from '../services/Filters';

@Component({
  selector: 'filterLinks',
  template:
    `
    <ul class="filters">
      <li><a ng-class="{selected: filterLinks.filters.isCurrent('')}" href="#/">All</a></li>
      <li><a ng-class="{selected: filterLinks.filters.isCurrent('active')}" href="#/active">Active</a></li>
      <li><a ng-class="{selected: filterLinks.filters.isCurrent('completed')}" href="#/completed">Completed</a></li>
    </ul>
    `
})
@Inject(Filters)
export default class FilterLinks {

  constructor(filters) {
    this.filters = filters;
  }
}