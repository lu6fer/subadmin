import ActionTypes from '../constants/ActionTypes';
import InitialState from '../constants/InitialState';

/**
 * Layout reducer, Toggle menu
 */
export default function layoutReducer(state = InitialState.layout, action) {
    switch (action.type) {
        case ActionTypes.TOGGLE_MENU:
            return {
                ...state,
                menuExpanded: action.menuExpanded,
                blockExpand: action.blockExpand
            };
        default:
            return state;
    }
}
