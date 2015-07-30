import 'babel/polyfill';
import 'angular';
import 'zone.js';
import uiRouter from 'angular-ui-router';
import {Component, View, Inject, bootstrap} from 'ng-forward';

@Inject('$state')
class Test{
	constructor($state){
		this.isReal = true;
		console.log($state);
	}

	getValue(){
		return new Promise(resolve => {
			setTimeout(() => resolve(30), 3000);
		});
	}
}

@Component({ selector: 'nested' })
@View({ template: '...' })
class Nested{ }

@Component({
	selector: 'inner-app',
	properties: ['message'],
	events: ['test']
})
@View({
	directives: [Nested],
	template: `
		<h2 on-click="innerApp.emmit()">Inner app</h2> <nested></nested>
		<div ng-if="innerApp.num">{{ innerApp.num }}</div>
	`
})
@Inject(Test, '$element')
class InnerApp{
	constructor(test, $element){
		this.$element = $element;
		this.test = test;
		this.resolveValue();
		console.log(this);
		console.log(this.message);
	}

	async resolveValue(){
		this.num = await this.test.getValue();
	}

	emmit(){
		this.TestEmitter.onNext();
	}
}

@Component({
	selector: 'app',
	bindings: [Test, uiRouter]
})
@View({
	directives: [InnerApp, Nested],
	template: `
		<h1>Hello, world!</h1> <nested></nested>
		<span>Trigger count: {{ app.triggers }}</span>
		<inner-app on-test="app.onTest()" bind-message="app.message"></inner-app>
	`
})
class AppCtrl{
	constructor(){
		this.triggers = 0;
		this.message = 'Hi, inner app!';
	}
	onTest(){
		this.triggers++;
	}
}

bootstrap(AppCtrl);
