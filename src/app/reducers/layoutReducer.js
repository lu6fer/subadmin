import ActionTypes from '../constants/ActionTypes';
import InitialState from '../constants/InitialState';

/**
 * Layout reducer, Toggle menu
 */
export default function layoutReducer(state = InitialState.expanded, action) {
    console.log(state);
    console.log(action);
    switch (action.type) {
        case ActionTypes.TOGGLE_MENU:
            return action.expanded;
        default:
            return state;
    }
}
