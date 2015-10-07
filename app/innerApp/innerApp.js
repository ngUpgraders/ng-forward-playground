import {Component, View, Inject, EventEmitter} from 'ng-forward';
import Nested from '../Nested/Nested';
import Test from '../services/Test';

// A component where we'll showcase properties and events. Declare your properties
// and events as arrays just like Angular 2. You can rename an event locally by
// using the syntax 'localName: attrName'. If you just specify a single string
// 'name' then it is used for both the local name and attr name.
@Component({
  selector: 'inner-app',
  properties: ['message1', 'message2', 'msg3: message3'],
  events: ['event1', 'evt2: event2']
})
// Set the view of the Component. Add the directives you'll be using to the
// 'directives' array. For now, there is no need to specify core directives
// (e.g. ng-if, ng-show, ng-repeat, etc).
@View({
  directives: [Nested],
  template: require('./InnerApp.html')
})
// Here we inject some elements into the constructor, notice how we inject our
// completely undecorated Test class. Because it's been auto-assigned a service
// behind the scenes, we are able to inject it just fine. Also we'll inject
// a reference the $element with a string. This is still very ng1, but it suffices.
@Inject(Test, '$element')
export default class InnerApp{
  constructor(test, $element){
    this.$element = $element;
    this.test = test;
    this.resolveValue();

    // If you register an event in the 'events' array in @Component, and that
    // event is an instance of EventEmitter, then ng-forward sees that and allows
    // you to broadcast that event as an observable with .next(). See our
    // EventEmitter class for more api info.
    this.evt2 = new EventEmitter();
  }

  // Not anything to do with ng-forward... but super cool async / await. Amiright?
  async resolveValue(){
    this.num = await this.test.getValue();
  }

  // Example of how to trigger a non-EventEmitter event. It's just a dom event.
  // These only bubble if you tell them to.
  triggerEventNormally() {
    this.$element.triggerHandler('event1');
  }

  // Example of how to trigger an EventEmitter event. These will bubble by default.
  triggerEventViaEventEmitter() {
    this.evt2.next();
  }
}