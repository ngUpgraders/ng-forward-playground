import angular from 'angular';

import {expect, sinon} from '../tests/frameworks';
import Filters from './Filters';

describe('Filters', () => {
  let FiltersInstance;

  const $location = {
    path: sinon.stub()
  };

  beforeEach(() => {
    FiltersInstance = new Filters($location);
  });

  it('gets injected with $location', () => {
    expect(FiltersInstance.$location).to.be.defined;
  });

  it('has a key value store of filters', () => {
    expect(FiltersInstance.filters).to.be.an('object');
  });

  context('filters.noname', () => {
    it('returns true', () => {
      expect(FiltersInstance.filters['']()).to.eq(true);
    });
  });

  context('filters.active', () => {
    let filter;

    beforeEach(() => {
      filter = FiltersInstance.filters.active;
    });

    it('returns true if the given object is not completed', () => {
      expect(filter({ completed: false })).to.eq(true);
    });

    it('returns false if the given object is completed', () => {
      expect(filter({ completed: true })).to.eq(false);
    });
  });

  context('filters.completed', () => {
    let filter;

    beforeEach(() => {
      filter = FiltersInstance.filters.completed;
    });

    it('returns true if the given object is completed', () => {
      expect(filter({ completed: true })).to.eq(true);
    });

    it('returns false if the given object is not completed', () => {
      expect(filter({ completed: false })).to.eq(false);
    });
  });

  context('.currentName()', () => {
    it('strips the leading slash of $location.path', () => {
      $location.path.returns('/foo');
      expect(FiltersInstance.currentName()).to.eq('foo');
    });
  });

  context('.current()', () => {
    it('returns the filter matching $location path', () => {
      $location.path.returns('active');
      expect(FiltersInstance.current()).to.eq(FiltersInstance.filters.active);
    });

    it('returns undefined if no match', () => {
      $location.path.returns('boo');
      expect(FiltersInstance.current()).to.eq(undefined);
    });
  });

  context('.isCurrent()', () => {
    it('returns true if the passed filter matches $location path', () => {
      $location.path.returns('completed');
      expect(FiltersInstance.isCurrent('completed')).to.eq(true);
    });

    it('returns false if the passed filter does not match $location path', () => {
      $location.path.returns('completed');
      expect(FiltersInstance.isCurrent('active')).to.eq(false);
    });
  });
});
