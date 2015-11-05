import {expect, sinon} from '../tests/frameworks';
import {Todo, TodoStore} from './TodoStore';

describe('Todo', () => {
  it('throws without a title', () => {
    function fn () {
      new Todo();
    }

    expect(fn).to.throw(/Cannot read property 'trim' of undefined/);
  });

  it('trims the given title', () => {
    expect(new Todo('Foo ').title).to.eq('Foo');
  });

  it('sets the given completed state', () => {
    expect(new Todo('foo', true).completed).to.eq(true);
  });

  it('defaults to not completed', () => {
    expect(new Todo('foo').completed).to.eq(false);
  });
});

describe('TodoStore', () => {
  let ctx = 'TodoStore';
  let store;

  beforeEach(() => {
    let todos = [
      { title: 'foo', completed: false },
      { title: 'bar', completed: true }
    ];

    localStorage.getItem = sinon.stub();
    localStorage.getItem.withArgs('todos').returns(JSON.stringify(todos));
    store = new TodoStore();
  });

  it('has a list of todos', () => {
    expect(store.todos).be.an('Array');
  });

  it('grabs persisted todos from localStorage', () => {
    expect(store.todos[0]).to.deep.eq({
      title: 'foo',
      completed: false
    });
  });

  context('.countCompleted()', () => {
    isInstanceMethod(TodoStore, 'countCompleted');

    it('returns the amount of completed todos', () => {
      expect(store.countCompleted()).to.eq(1);
    });
  });

  context('.allCompleted()', () => {
    isInstanceMethod(TodoStore, 'allCompleted');

    it('returns false if all todos are not completed', () => {
      expect(store.allCompleted()).to.eq(false);
    });

    it('returns true if all todos are completed', () => {
      store.todos[0].completed = true;
      expect(store.allCompleted()).to.eq(true);
    });
  });

  context('.countRemaining()', () => {
    isInstanceMethod(TodoStore, 'countRemaining');

    it('returns the count of non completed todos', () => {
      expect(store.countRemaining()).to.eq(1);
    });
  });

  context('.setAllTo', () => {
    isInstanceMethod(TodoStore, 'setAllTo');

    it('sets the completed status of all todos to the given value', () => {
      store.setAllTo(false);
      expect(store.todos.filter(t => !t.completed ).length).to.eq(2);

      store.setAllTo(true);
      expect(store.todos.filter(t => t.completed ).length).to.eq(2);
    });
  });

  context('.removeCompleted', () => {
    isInstanceMethod(TodoStore, 'removeCompleted');

    it('removes all completed tasks', () => {
      store.removeCompleted();
      expect(store.todos.length).to.eq(1);
    });
  });

  context('.remove()', () => {
    isInstanceMethod(TodoStore, 'remove');

    it('removes the given todo', () => {
      store.remove(store.todos[0]);
      expect(store.todos.length).to.eq(1);
    });
  });

  context('.add()', () => {
    isInstanceMethod(TodoStore, 'add');

    it('adds a built todo to the list of todos', () => {
      store.add('baz', true);
      expect(store.todos[store.todos.length - 1]).to.deep.eq(new Todo('baz', true));
    });
  });

  context('.save()', () => {
    isInstanceMethod(TodoStore, 'save');

    it('stores the current todos list in localStorage', () => {
      localStorage.setItem = sinon.stub();
      store.save();
      expect(localStorage.setItem)
        .to.have.been.calledOnce
        .and.calledWith('todos', JSON.stringify(store.todos));
    });
  });

  function isInstanceMethod (context, method) {
    it(`is an instance method of ${ctx}`, () => {
      expect(new context())
        .to.have.property(method)
        .that.is.a('function');
    });
  }
});
