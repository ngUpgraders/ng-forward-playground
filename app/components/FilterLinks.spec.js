import {expect, sinon} from '../tests/frameworks';
import 'angular';
import 'angular-mocks';
import 'ng-forward';
import {providers, TestComponentBuilder} from '../../node_modules/ng-forward/dist/tests';
import FilterLinks from './FilterLinks';


describe.only('FilterLinks', () => {
  context('class definition', () => {
    it('takes a set of filters', () => {
      expect(new FilterLinks([]).filters).to.deep.eq([]);
    });
  });

  context('component', () => {
    let tcb, component, mockSomeOtherService, SomeOtherService;

    beforeEach(() => {
      providers(provide => {
        return [
          provide('Filters', { useValue: ['a','b','c'] })
        ];
      });

      tcb = new TestComponentBuilder();
      component = tcb.create(FilterLinks);
    });

    it('has a selector of "filterLinks"', () => {
      console.log(component.debugElement.componentInstance);
    });

    it('compiles down to a <filter-links> element', () => {
      expect(component.debugElement.nativeElement.tagName).to.eq('FILTERLINKS');
    });

    xit('gets injected with Filters', () => {
    });

    xit('spews out list items', () => {
    });
  });
});
