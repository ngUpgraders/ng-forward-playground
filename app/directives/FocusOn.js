import {Directive, Inject} from 'ng-forward';

/**
 * Directive that places focus on the element it is applied to when the
 * expression it binds to evaluates to true
 */
@Directive({ selector: '[focus-on]' })
@Inject('$timeout', '$scope', '$attrs', '$element')
export default class FocusOn {
  constructor($timeout, $scope, $attrs, $element) {
    $scope.$watch($attrs.focusOn, newVal => {
      if (newVal) {
        $timeout(() => $element[0].focus(), 0, false);
      }
    });
  }
}