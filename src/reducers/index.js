import { combineReducers } from 'redux';
import authReducer from './authReducer';
import snackBarReducer from './snackBarReducer';
import listsReducer from './listsReducer';
import itemsReducer from './itemsReducer';

/**
 * Individual reducers are combined into a single rootReducer
 * to create the discrete properties of the state.
 * Giving reducers keys: e.g. auth for the authReducer
 * means that you can access properties from this reducer using
 * state.auth.whatever_you_want
 * otherwise, state.authReducer.whatever_you_want
 * It can be state or store
 */
const reducers = combineReducers({
    auth: authReducer,
    snacks: snackBarReducer,
    lists: listsReducer,
    items: itemsReducer,
});

export default reducers;

/**
 * Things to know about Redux:-
 * It maintains a global state object which acts as the source of truth
 *
 * 1 global state object manages state for the entire application.
 * It is the single source of truth
 *
 * We can modify this state only and only if we emit an action. An action is
 * an object that describes what should change.
 *
 * Action creators are functions that are dispatched to emit the change.
 * All they do is to return an action
 *
 * When an action is dispatched, a reducer is a function that actually changes
 * the state appropriate to that action or returns the existing state if the
 * new action is not applicable to the reducer
 *
 * Reducers are pure functions... they shouldn't mutate state
 */
