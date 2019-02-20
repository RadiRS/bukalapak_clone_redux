import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'remote-redux-devtools';
import thunk from 'redux-thunk';
import reducers from './reducers';
import promiseMiddleware from 'redux-promise-middleware';

const middleware = [thunk];

const loggerMiddleware = store => next => action => {
  console.log('dispatching: ', action);
  next(action);
};

const store = createStore(
  reducers,
  composeWithDevTools(
    applyMiddleware(...middleware, promiseMiddleware, loggerMiddleware)
  )
);

export default store;
