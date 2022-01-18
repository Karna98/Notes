/**
 * index.ts
 *
 * Description:
 *    Redux Store.
 *
 */

import { combineReducers, configureStore } from '@reduxjs/toolkit';
import reducers from './reducer';

const reducer = combineReducers(reducers);

const store = configureStore({ reducer });

// Infer the `RootState` and `AppDispatch` types from the store itself
type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export { RootState, AppDispatch };

export default store;
