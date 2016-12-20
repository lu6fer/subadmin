import ActionTypes from '../constants/ActionTypes';
import InitialState from '../constants/InitialState';

/**
 * Error reducer
 */
export default function notificationReducer(state = InitialState.notification, action) {
    switch (action.type) {
        case ActionTypes.NOTIFICATION_HIDE:
            return {
                ...state,
                open: false,
                type: null,
                messages: InitialState.notification.messages
            };
        case ActionTypes.FETCH_USERS_ERROR:
        case ActionTypes.UPDATE_USERS_ERROR:
        case ActionTypes.DELETE_USERS_ERROR:
            return {
                ...state,
                open: true,
                type: 'error',
                messages: action.data
            };
        case ActionTypes.DELETE_USERS_SUCCESS:
            return {
                ...state,
                open: true,
                type: 'success',
                messages: action.data
            };
        default:
            return state;
    }
}