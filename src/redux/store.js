import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';

import {composeWithDevTools} from 'redux-devtools-extension';
import {singleReducer} from './combineReducer';

const store = createStore(
  singleReducer,
  composeWithDevTools(applyMiddleware(thunk)),
);

export default store;
