import ActionTypes from '../constants/ActionTypes';
import InitialState from '../constants/InitialState';

/**
 * Users reducer
 */
export default function usersReducer(state = InitialState.users, action) {
    switch (action.type) {
        case ActionTypes.FETCH_USERS_REQUEST:
            return Object.assign({}, state, {
                loading: true,
                error: false
            });
        case ActionTypes.FETCH_USERS_ERROR:
            console.log(action);
            return Object.assign({}, state,
                {
                    loading: false,
                    errorMessages: action.data,
                    error: true
                });
        case ActionTypes.FETCH_USERS_SUCCESS:
            return Object.assign({}, state,
                {
                    loading: false,
                    users: action.data,
                    error: false
                });
        case ActionTypes.FILTER_USER:
            return Object.assign({}, state,
                {
                    filter: action.filter
                });
        default:
            return state;
    }
}
