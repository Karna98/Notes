/**
 * index.ts
 *
 * Description:
 *    Redux Store.
 *
 */

import { combineReducers, createStore } from 'redux';
import reducers from './reducer';

const reducer = combineReducers(reducers);

const store = createStore(reducer);

export default store;
