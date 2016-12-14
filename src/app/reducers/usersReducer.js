import ActionTypes from '../constants/ActionTypes';
import InitialState from '../constants/InitialState';

/**
 * Users reducer, Toggle menu
 */
/* export default function usersReducer(state = {
    users: InitialState.users,
    error: InitialState.error,
    errorMessages: InitialState.errorMessage,
    loading: InitialState.loading
}, */
export default function usersReducer(state = InitialState.users, action) {
    switch (action.type) {
        case ActionTypes.FETCH_USERS_REQUEST:
            return Object.assign({}, state, {
                loading: true,
                error: false
            });
        case ActionTypes.FETCH_USERS_ERROR:
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
        default:
            return state;
    }
}
