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
                loading: true,
                error: {
                    status: false,
                    messages: []
                }
            };
        case ActionTypes.FETCH_USERS_ERROR:
            console.log(action);
            return {
                ...state,
                loading: false,
                error: {
                    status: true,
                    messages: action.data
                }
            };
        case ActionTypes.FETCH_USERS_SUCCESS:
            return {
                ...state,
                loading: false,
                users: action.data,
                error: {
                    status: false,
                    messages: []
                }
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
