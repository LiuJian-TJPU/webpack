import { createStore, applyMiddleware } from 'redux';

// import createSagaMiddleware from 'redux-saga';

import reducer from './reducer';
// import saga from './sagas';

// import thunk from './thunk'
// import logger from 'redux-logger'

// const sagaMiddleware = createSagaMiddleware()
// const enhancers = process.env.NODE_ENV === 'production' ? [] : [logger];
const store = createStore(
  reducer
  // applyMiddleware(...enhancers)
);
// sagaMiddleware.run(saga);
export default store;