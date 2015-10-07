import {Component, View} from 'ng-forward';

// A super simple component. Notice ng-forward doesn't require you to use any calls
// to @Module, new Module or .Module like previous decorator libraries. We auto
// create a module for you during bootstrap.
@Component({ selector: 'nested' })
@View({ template: '<h3>Nested</h3>' })
export default class Nested {
}


