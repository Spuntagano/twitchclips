// tslint:disable: no-unused-expression

import chai from 'chai';
import { createStore } from 'redux';
import rootReducer from '../../redux/reducers';
import { createState, renderComponentWithRouter } from '../../helpers/TestHelper';
import { Clip } from './index';
import clipMock from '../../mocks/clip';

const { expect, spy } = chai;

describe('<Clip />', () => {
  it('Renders with correct style', () => {
    const state = createState({
      clips: {
        data: {
          ...clipMock
        },
        isFetching: false,
        labels: {
          top: [],
          single: [...Object.keys(clipMock)]
        },
        search: {}
      }
    });

    const store = createStore(rootReducer, state);
    const component = renderComponentWithRouter(Clip, store, '/clip', '/AmazonianEncouragingLyrebirdAllenHuhu', '/clip/:slug');
    const style = require('./style.scss');

    expect(component.find(style.Clip)).to.exist;
  });

  it('Renders clip', () => {
    const state = createState({
      clips: {
        data: {
          ...clipMock
        },
        isFetching: false,
        labels: {
          top: [],
          single: [...Object.keys(clipMock)]
        },
        search: {}
      }
    });

    const store = createStore(rootReducer, state);
    const component = renderComponentWithRouter(Clip, store, '/clip', '/AmazonianEncouragingLyrebirdAllenHuhu', '/clip/:slug');
    const style = require('./style.scss');

    expect(component.find(`.${style.title}`).text()).to.eql('Clip Title Editing');
  });

  it('Does not dispatch actions if search empty on mount', done => {
    const state = createState({
      clips: {
        data: {
          ...clipMock
        },
        isFetching: false,
        labels: {
          top: [],
          single: ['bob']
        },
        search: {}
      },
    });

    const store = createStore(rootReducer, state);
    const dispatchSpy = spy.on(store, 'dispatch');
    renderComponentWithRouter(Clip, store, '/clip', '/bob', '/clip/:slug');

    expect(dispatchSpy).to.not.have.been.called();

    done();
  });

  it('Does not dispatch actions if search empty on mount', done => {
    const state = createState({
      clips: {
        data: {
          ...clipMock
        },
        isFetching: false,
        labels: {
          top: [],
          single: ['bob']
        },
        search: {}
      },
    });

    const store = createStore(rootReducer, state);
    const dispatchSpy = spy.on(store, 'dispatch');
    renderComponentWithRouter(Clip, store, '/clip', '/bobo', '/clip/:slug');

    expect(dispatchSpy).to.have.been.called();

    done();
  });
});
