import {expect, sinon} from '../tests/frameworks';
import 'ng-forward/cjs/util/jqlite-extensions'; // temporary
import {Component} from 'ng-forward';
import {providers, TestComponentBuilder} from 'ng-forward/testing';
import Filters from '../services/Filters';
import FilterLinks from './FilterLinks';

describe('FilterLinks', () => {
  context('class definition', () => {
    it('takes a set of filters', () => {
      expect(new FilterLinks([]).filters).to.deep.eq([]);
    });
  });

  context('component', () => {
    let tcb, root, componentEl, component;

    @Component({
      selector:'test',
      directives: [FilterLinks],
      template:`<filter-links></filter-links>`
    })
    class Test {}

    beforeEach(() => {
      providers(provide => {
        return [
          provide(Filters, { useValue: ['a','b','c'] })
        ];
      });

      tcb = new TestComponentBuilder();
      root = tcb.create(Test);
      componentEl = root.debugElement.componentViewChildren[0];
      component = componentEl.componentInstance;
    });

    it('compiles down to a <filter-links> element', () => {
      expect(componentEl.nativeElement.tagName).to.eq('FILTER-LINKS');
    });

    it('gets injected with Filters', () => {
      expect(component.filters).to.eql(['a', 'b', 'c']);
    });

    it('spews out list items', () => {
      expect(componentEl.find('li')).to.have.length(3);
      // I don't love using .find, because its part of angular.element in ng1
      // I'll probably implement the debugElement's .query method soon to be
      // a proper polyfilled alias to .find.

      // more stuff here
    });
  });
});
