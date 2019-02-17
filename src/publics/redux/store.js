import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'remote-redux-devtools';
import thunk from 'redux-thunk';
import reducers from './reducers';
import promiseMiddleware from 'redux-promise-middleware';

const store = createStore(
  reducers,
  composeWithDevTools(
    applyMiddleware(thunk, promiseMiddleware),
    window.__REDUX_DEVTOOLS_EXTENSION__
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : f => f
  )
);

export default store;
