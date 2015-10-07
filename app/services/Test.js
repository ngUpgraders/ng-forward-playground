// In ng-forward you don't have to need to use a single decorator if you don't
// need any injectables. This class has zero annotations. It's a regular es6
// class. We wrap this in a service for you during bootstrap.
export default class Test{
  getValue(){
    return new Promise(resolve => {
      window.setTimeout(() => resolve('Async FTW!'), 3000);
    });
  }
}

