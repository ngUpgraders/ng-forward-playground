import 'babel/polyfill';
import 'angular';
import 'zone.js';
import {Component, View, bootstrap} from 'ng-forward';
import uiRouter from 'angular-ui-router';
import InnerApp from './innerApp/innerApp';
import Test from './services/Test';
import Nested from './Nested/Nested';

// Our root component which we will bootstrap below. Again no module management
// needed. Here we specify the non-directive injectables we want to provide for
// injection in the 'bindings' array in @Component. Notice we are passing in
// "ui.router" as a string; ng-forward recognizes this as a module and bundles
// it with this component. All of ui-router's injectables are now available to
// inject into controllers or use in your templates.
@Component({
  selector: 'app',
  bindings: [Test, uiRouter]
})
@View({
  // Again specifying directives to use. We really wanted to support specifying
  // dependencies as Objects and not strings wherever possible. So we just pass
  // in the InnerApp and Nested class references.
  directives: [InnerApp, Nested],
  template: `
    <h1>App</h1>
    <nested></nested>
    <p>Trigger count: {{ app.triggers }}</p>

    <!-- You still have to use non-event ng1 directives, such as ng-model used here. -->
    <h4>One Way Binding to Child:</h4>
    <input ng-model="app.message1"/>

    <h4>Two Way Binding to/from Child:</h4>
    <input ng-model="app.message2"/>

    <hr/>

    <!-- Here we see various bindings and events in use. We are listening for
    the event1 and event2 events on inner-app. You have to prepend with
    '()' for events. With message 1, 2 and 3, we show the three ways you
    can bind to component properties: prop (with no prefix) will pass in
    a simple string, [prop] will one-way bind to an expression, and
    [(prop)] will two way bind to an expression. -->
    <inner-app (event1)="app.onIncrement()" (event2)="app.onIncrement()"
    [message1]="app.message1" [(message2)]="app.message2" message3="Hey, inner app... nothin'">
    </inner-app>
  `
})
class App{
  constructor(){
    this.triggers = 0;
    this.message1 = 'Hey, inner app, you can not change this';
    this.message2 = 'Hey, inner app, change me';
  }

  onIncrement(){
    this.triggers++;
  }
}

// Finally go ahead and bootstrap a component. It will look for the selector
// in your html and call ng1's bootstrap method on it. What's cool is if you
// include zone.js in your app, we'll automatically bootstrap your app within
// the context of a zone so you don't need to call $scope.$apply (Mike is
// this really true??).
bootstrap(App);
