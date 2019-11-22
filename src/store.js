import logger from 'redux-logger';

import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { loadState, saveState } from './lib/localStorage';

import { reducer } from './features/questions/questions-reducer';
import throttle from 'lodash/throttle';

import rootSaga from './features/questions/questions-saga';

const bindMiddleware = middleware => {
  if (process.env.NODE_ENV !== 'production') {
    const { composeWithDevTools } = require('redux-devtools-extension');
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};

const persistedState = loadState();

function configureStore() {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [sagaMiddleware, logger];
  const store = createStore(
    reducer,
    persistedState,
    bindMiddleware([...middlewares])
  );

  store.sagaTask = sagaMiddleware.run(rootSaga);

  store.subscribe(
    throttle(() => {
      //leave the questions key out for now
      saveState(store.getState());
    }, 1000)
  );

  return store;
}

export default configureStore;
