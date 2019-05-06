// tslint:disable: no-unused-expression

import chai from 'chai';
import { createStore } from 'redux';
import rootReducer from '../../redux/reducers';
import { createState, renderComponentWithRouter } from '../../helpers/TestHelper';
import { Home } from './index';
import clipMock from '../../mocks/clip';

const { expect, spy } = chai;

describe('<Home />', () => {
  it('Renders with correct style', done => {
    const state = createState({
      clips: {
        data: {
          ...clipMock
        },
        isFetching: false,
        labels: {
          top: [...Object.keys(clipMock)],
          single: []
        },
        search: {}
      },
    });

    const store = createStore(rootReducer, state);
    const component = renderComponentWithRouter(Home, store);
    const style = require('./style.scss');
    expect(component.find(style.Home)).to.exist;

    done();
  });

  it('Renders clips', done => {
    const state = createState({
      clips: {
        data: {
          ...clipMock
        },
        isFetching: false,
        labels: {
          top: [...Object.keys(clipMock)],
          single: []
        },
        search: {}
      },
    });

    const store = createStore(rootReducer, state);
    const component = renderComponentWithRouter(Home, store);
    const style = require('./style.scss');
    expect(component.find(`.${style.title}`).text()).to.eql('Clip Title Editing');

    done();
  });

  it('Dispatch actions if search empty on mount', done => {
    const state = createState({
      clips: {
        data: {
          ...clipMock
        },
        isFetching: false,
        labels: {
          top: [...Object.keys(clipMock)],
          single: []
        },
        search: {}
      },
    });

    const store = createStore(rootReducer, state);
    const dispatchSpy = spy.on(store, 'dispatch');
    renderComponentWithRouter(Home, store, '/game', '/starCraft', '/:type/:name');

    expect(dispatchSpy).to.have.been.first.called.with({
      type: 'GET_CLIPS_REQUEST'
    });

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
          top: [...Object.keys(clipMock)],
          single: []
        },
        search: {}
      },
    });

    const store = createStore(rootReducer, state);
    const dispatchSpy = spy.on(store, 'dispatch');
    renderComponentWithRouter(Home, store, '', '', '/');

    expect(dispatchSpy).to.not.have.been.called();

    done();
  });

  it('Dispatch actions if location is different', done => {
    const state = createState({
      clips: {
        data: {
          ...clipMock
        },
        isFetching: false,
        labels: {
          top: [...Object.keys(clipMock)],
          single: []
        },
        search: {
          type: 'game',
          name: 'starCraft',
          period: 'week'
        }
      },
    });

    const store = createStore(rootReducer, state);
    const dispatchSpy = spy.on(store, 'dispatch');
    const component = renderComponentWithRouter(Home, store, '/game', '/starCraft/week', '/:type/:name/:period');
    const homeC = component.find('HomeC').first().instance() as any;

    homeC.props.history.push('/game/starCraft II/week');

    expect(dispatchSpy).to.have.been.first.called.with({
      type: 'GET_CLIPS_REQUEST'
    });

    done();
  });

  it('Does not dispatch actions if location is the same', done => {
    const state = createState({
      clips: {
        data: {
          ...clipMock
        },
        isFetching: false,
        labels: {
          top: [...Object.keys(clipMock)],
          single: []
        },
        search: {
          type: 'game',
          name: 'starCraft',
          period: 'week'
        }
      },
    });

    const store = createStore(rootReducer, state);
    const dispatchSpy = spy.on(store, 'dispatch');
    const component = renderComponentWithRouter(Home, store, '/game', '/starCraft/week', '/:type/:name/:period');
    const homeC = component.find('HomeC').first().instance() as any;

    homeC.props.history.push('/game/starCraft/week');

    expect(dispatchSpy).to.not.have.been.called();

    done();
  });
});
