// import update from 'react-addons-update';
import ActionTypes from '../constants/ActionTypes';
import InitialState from '../constants/InitialState';

/**
 * Users reducer
 */
export default function usersReducer(state = InitialState.users, action) {
    switch (action.type) {
        case ActionTypes.FETCH_USERS_REQUEST:
            return {
                ...state,
                loading: true
            };
        case ActionTypes.FETCH_USERS_ERROR:
            return {
                ...state,
                loading: false
            };
        case ActionTypes.FETCH_USERS_SUCCESS:
            return {
                ...state,
                loading: false,
                users: action.data
            };
        case ActionTypes.DELETE_USERS_REQUESTED:
            return {
                ...state,
                deleting: action.user
            };
        case ActionTypes.DELETE_USERS_CANCELED:
            return {
                ...state,
                deleting: InitialState.users.deleting
            };
        case ActionTypes.DELETE_USERS_ERROR:
            return {
                ...state,
                deleting: InitialState.users.deleting
            };
        case ActionTypes.DELETE_USERS_SUCCESS:
            return {
                ...state,
                users: state.users.filter(user => user.slug !== action.deleted),
                deleting: InitialState.users.deleting
            };
        case ActionTypes.FILTER_USER:
            return {
                ...state,
                filter: action.filter
            };
        case ActionTypes.SORT_USER: {
            return {
                ...state,
                sort: action.sort
            };
        }
        default:
            return state;
    }
}
