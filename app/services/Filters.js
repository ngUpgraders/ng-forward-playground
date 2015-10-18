import {Injectable, Inject} from 'ng-forward';

@Injectable()
@Inject('$location')
export default class Filters {
  constructor($location) {
    this.$location = $location;

    this.filters = {
      '': () => true,
      'active': todo => !todo.completed,
      'completed': todo => todo.completed
    };
  }

  currentName() {
    // strip off leading forward slash
    return this.$location.path().replace(/^\//, '');
  }

  current() {
    return this.filters[this.currentName()];
  }

  isCurrent(filterName) {
    return (filterName) === this.currentName();
  }
}