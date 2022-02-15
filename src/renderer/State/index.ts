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
  setCurrentSpaceState,
  setMessageState,
  setSessionState,
  setSpacesState,
  updateCredentialState,
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
  addCredentialState,
  addNoteState,
  addSpaceState,
  clearMessageState,
  clearSessionState,
  clearSpacesState,
  setMessageState,
  setCurrentSpaceState,
  setSessionState,
  setSpacesState,
  updateCredentialState,
  updateNoteState,
};

// Default export of State of Redux store.
export default reducer;
