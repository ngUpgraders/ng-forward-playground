import 'babel/polyfill';
import 'angular';
import 'zone.js';
import uiRouter from 'angular-ui-router';
import {Component, View, Inject, EventEmitter, bootstrap} from 'ng-forward';

// Note: This class has zero annotations. It's a regular es6 class.
// We wrap this in a service at bootstrap time.
class Test{
	constructor(){
		this.isReal = true;
	}

	getValue(){
		return new Promise(resolve => {
			setTimeout(() => resolve('Async FTW!'), 3000);
		});
	}
}


@Component({ selector: 'nested' })
@View({ template: '<h3>Nested</h3>' })
class Nested{ }


@Component({
	selector: 'inner-app',
	properties: ['message1', 'message2', 'message3'],
	events: ['rxEvent', 'domEvent']
})
@View({
	directives: [Nested],
	template: `
		<h2>Inner app</h2>
		<p>ES7 async resolved value: {{ innerApp.num || 'resolving...' }}</p>
		<nested></nested>

		<h4>Event</h4>
		<button on-click="innerApp.triggerEventViaRx()">Trigger Rx Event</button>
		<button on-click="innerApp.triggerEventNormally()">Trigger DOM Event</button>

		<h4>One Way String from Parent (read-only)</h4>
		<p>{{innerApp.message3}}</p>

		<h4>One Way Binding from Parent (read-only)</h4>
		<input ng-model="innerApp.message1"/>

		<h4>Two Way Binding to/from Parent (read/write)</h4>
		<input ng-model="innerApp.message2"/>
	`
})
@Inject(Test, '$element')
class InnerApp{
	constructor(test, $element){
		this.$element = $element;
		this.test = test;
		this.resolveValue();
		this.rxEvent = new EventEmitter();
	}

	async resolveValue(){
		this.num = await this.test.getValue();
	}

	triggerEventNormally() {
		this.$element.triggerHandler('domEvent');
	}

	triggerEventViaRx() {
		this.rxEvent.next()
	}
}


@Component({
	selector: 'app',
	bindings: [Test, uiRouter]
})
@View({
	directives: [InnerApp, Nested],
	template: `
		<h1>App</h1>
		<nested></nested>
		<p>Trigger count: {{ app.triggers }}</p>

		<h4>One Way Binding to Child:</h4>
		<input ng-model="app.message1"/>

		<h4>Two Way Binding to/from Child:</h4>
		<input ng-model="app.message2"/>

		<hr/>
		<inner-app on-rx-event="app.onIncrement()" on-dom-event="app.onIncrement()"
		           bind-message1="app.message1" bind-on-message2="app.message2" message3="Hey, inner app... nothin'"></inner-app>
	`
})
class AppCtrl{
	constructor(){
		this.triggers = 0;
		this.message1 = 'Hey, inner app, you can not change this';
		this.message2 = 'Hey, inner app, change me';
	}
	
	onIncrement(){
		this.triggers++;
	}
}


bootstrap(AppCtrl);
