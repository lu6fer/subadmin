
import ActionTypes from '../constants/ActionTypes';
import WebAPIUtils from '../utils/WebAPIUtils';

function requestUsers() {
    return {
        type: ActionTypes.FETCH_USERS_REQUEST
    };
}

function receiveUsersSucess(json) {
    return {
        type: ActionTypes.FETCH_USERS_SUCCESS,
        data: json
    };
}

function receiveUsersError(json) {
    return {
        type: ActionTypes.FETCH_USERS_ERROR,
        data: json
    };
}

/**
 * App actions
 *
 * @type {Object}
 */
const AppActions = {
    /**
     * App initialize action
     *
     * @return {Object}
     */
    initialize() {
        return {
            type: ActionTypes.INITIALIZE
        };
    },

    /**
     * Placeholder action (example)
     *
     * @param  {number} inc increment value
     *
     * @return {Object}
     */
    placeholder(inc) {
        return {
            type: ActionTypes.PLACEHOLDER,
            inc
        };
    },

    /**
     * Example of async action
     *
     * @param  {number} inc increment value
     *
     * @return {Function}
     */
    placeholderAsync(inc) {
        return function thunk(dispatch) {
            return new Promise((resolve) => {
                setTimeout(() => {
                    dispatch(AppActions.placeholder(inc));
                    resolve();
                }, 500);
            });
        };
    },

    /**
     * Toggle nav bar
     * @param expanded
     * @returns {{type: string, expanded: *}}
     */
    toggleMenu(expanded) {
        return {
            type: ActionTypes.TOGGLE_MENU,
            expanded
        };
    },

    fetchUsers() {
        return function thunk(dispatch) {
            dispatch(requestUsers());
            return WebAPIUtils.getUsers()
                .then((data) => {
                    console.log(data);
                    if (data.errors) {
                        dispatch(receiveUsersError(data.messages));
                    } else {
                        dispatch(receiveUsersSucess(data.data.data));
                    }
                })
                .catch((error) => {
                    dispatch(receiveUsersError(error.data));
                });
        };
    }
};

export default AppActions;
