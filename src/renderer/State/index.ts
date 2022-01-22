/**
 * index.ts
 *
 * Description:
 *    Index for Redux Store, Reducers and Actions.
 *
 */

// Import actions and reducers from 'reducer';
import reducer, {
  addNoteState,
  addSpaceState,
  clearMessageState,
  clearSessionState,
  clearSpacesState,
  setCurrentSpaceState,
  setMessageState,
  setSessionState,
  setSpacesState,
  updateNoteState,
} from './reducer';
import store from './store';

// Infer the `RootState` and `AppDispatch` types from the store itself.
type RootStateType = ReturnType<typeof store.getState>;
type AppDispatchType = typeof store.dispatch;

export {
  store,
  // Types
  RootStateType,
  AppDispatchType,
  // Actions
  addNoteState,
  addSpaceState,
  clearMessageState,
  clearSessionState,
  clearSpacesState,
  setMessageState,
  setCurrentSpaceState,
  setSessionState,
  setSpacesState,
  updateNoteState,
};

// Default export of State of Redux store.
export default reducer;
