import 'babel-polyfill';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { renderRoutes } from 'react-router-config';
const { browserHistory } = require('react-router');

import { ConnectedRouter } from 'react-router-redux';
import { createBrowserHistory } from 'history';
import { routes } from './app/routes';

import { configureStore } from './app/redux/store';

const store = configureStore(browserHistory, window.__INITIAL_STATE__);
const history = createBrowserHistory();

const entry = (
  <Provider store={store} key="provider">
    <ConnectedRouter history={history}>{renderRoutes(routes)}</ConnectedRouter>
  </Provider>
);

const entryNode = document.getElementById('app');

if (!entryNode) {
  throw Error('Could not find entry dom node: ' + entryNode);
}

ReactDOM.hydrate(entry, entryNode);

if ((module as any).hot) {
  (module as any).hot.accept();

  (module as any).hot.accept('./app/routes', () => {
    ReactDOM.unmountComponentAtNode(entryNode);
    ReactDOM.render(
      <Provider store={store}>
        <ConnectedRouter history={history}>{renderRoutes(routes)}</ConnectedRouter>
      </Provider>,
      entryNode
    );
  });
}
