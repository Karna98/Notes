/**
 * store.ts
 *
 * Description:
 *    Redux Store.
 *
 */

import { combineReducers, configureStore } from '@reduxjs/toolkit';
import reducers from './reducer';

const reducer = combineReducers(reducers);

const store = configureStore({ reducer });

export default store;
