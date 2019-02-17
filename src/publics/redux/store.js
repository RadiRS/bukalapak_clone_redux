import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import promiseMiddleware from 'redux-promise-middleware';

const middleware = [thunk];

const store = createStore(
  reducers,
  compose(
    applyMiddleware(...middleware, promiseMiddleware),
    window.__REDUX_DEVTOOLS_EXTENSION__
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : f => f
  )
);

export default store;
