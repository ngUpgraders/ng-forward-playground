import {Component, EventEmitter, Inject} from 'ng-forward';
import FocusOn from '../directives/FocusOn';

const ESC_KEY = 27;
const ENTER_KEY = 13;

@Component({
  selector: 'text-editor',
  inputs: ['value', 'placeholder', 'inputClasses', 'focusOn'],
  outputs: ['start', 'enter', 'end', 'abort'],
  directives: [FocusOn],
  template:
  `<input class="{{textEditor.inputClasses}}" placeholder="{{textEditor.placeholder}}"
          ng-model="textEditor.value"
          (keyup)="textEditor.keyup($event.keyCode)"
          (focus)="textEditor.start.next()"
          (blur)="textEditor.end.next()"
          autofocus focus-on="textEditor.focusOn">`
})
@Inject('$element')
export default class TextEditor {
  constructor($element) {
    this.$input = $element.find('input')[0];
    this.start = new EventEmitter();
    this.enter = new EventEmitter();
    this.end = new EventEmitter();
    this.abort = new EventEmitter();
  }

  keyup(keyCode) {
    if(keyCode === ENTER_KEY) {
      this.enter.next();
    }
    if(keyCode === ESC_KEY) {
      this.abort.next();
    }
  }
}
