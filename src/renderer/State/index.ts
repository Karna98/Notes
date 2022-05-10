/**
 * index.ts
 *
 * Description:
 *    Index for Redux Store, Reducers and Actions.
 *
 */

// Import actions and reducers from 'reducer';
import reducer, {
  addCredentialState,
  addNoteState,
  addSpaceState,
  clearMessageState,
  clearSessionState,
  clearSpacesState,
  clearVolatileState,
  setCurrentSpaceState,
  setMessageState,
  setSessionState,
  setSpacesState,
  setVolatileState,
  updateCredentialState,
  updateNoteState,
  updateSessionState,
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
  addCredentialState,
  addNoteState,
  addSpaceState,
  clearMessageState,
  clearSessionState,
  clearSpacesState,
  clearVolatileState,
  setMessageState,
  setCurrentSpaceState,
  setSessionState,
  setSpacesState,
  setVolatileState,
  updateCredentialState,
  updateNoteState,
  updateSessionState,
};

// Default export of State of Redux store.
export default reducer;
