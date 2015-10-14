import 'babel/polyfill';
import 'angular';
import 'zone.js';
import {bootstrap} from 'ng-forward';
import TodoApp from './components/TodoApp';

bootstrap(TodoApp);