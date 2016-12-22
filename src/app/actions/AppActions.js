
import ActionTypes from '../constants/ActionTypes';
import WebAPIUtils from '../utils/WebAPIUtils';

/*
 * Fetch Users
 */
function requestFetchUsers() {
    return {
        type: ActionTypes.FETCH_USERS_REQUEST
    };
}

function receiveFetchUsersSucess(json) {
    return {
        type: ActionTypes.FETCH_USERS_SUCCESS,
        data: json
    };
}

function receiveFetchUsersError(json) {
    return {
        type: ActionTypes.FETCH_USERS_ERROR,
        data: json
    };
}

/*
 * Delete
 */
function requestDeleteUser() {
    return {
        type: ActionTypes.DELETE_USER_REQUEST
    };
}

function receiveDeleteUsersSucess(json, deleted) {
    return {
        type: ActionTypes.DELETE_USER_SUCCESS,
        data: json,
        deleted
    };
}

function receiveDeleteUsersError(json) {
    return {
        type: ActionTypes.DELETE_USER_ERROR,
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
     * Hide notification sncakbar
     *
     * @returns {{type: string}}
     */
    hideNotification() {
        return {
            type: ActionTypes.NOTIFICATION_HIDE
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
     *
     * @param expanded
     *
     * @param block
     *
     * @returns {{type: string, expanded: *}}
     */
    toggleMenu(expanded, block = false) {
        return {
            type: ActionTypes.TOGGLE_MENU,
            menuExpanded: expanded,
            blockExpand: block
        };
    },

    /**
     * Fetch users from API
     *
     * @returns {thunk}
     */
    fetchUsers() {
        return function thunk(dispatch) {
            dispatch(requestFetchUsers());
            return WebAPIUtils.getUsers()
                .then((data) => {
                    if (data.errors) {
                        dispatch(receiveFetchUsersError(data.messages));
                    } else {
                        dispatch(receiveFetchUsersSucess(data.data.data));
                    }
                })
                .catch((error) => {
                    const errorData = [];
                    if (error.response) {
                        errorData.push(error.response.data);
                    } else {
                        errorData.push(error.message);
                    }
                    dispatch(receiveFetchUsersError(errorData));
                });
        };
    },

    /**
     * Delete user is requested
     *
     * @param user
     *
     * @returns {{type: string, user: *}}
     */
    deleteUserRequested(user) {
        return {
            type: ActionTypes.DELETE_USER_REQUESTED,
            user
        };
    },

    /**
     * Delete user is canceled
     *
     * @returns {{type: string}}
     */
    deleteUserCanceled() {
        return {
            type: ActionTypes.DELETE_USER_CANCELED
        };
    },

    /**
     * Deleting user
     *
     * @param user
     *
     * @returns {thunk}
     */
    deleteUser(user) {
        return function thunk(dispatch) {
            dispatch(requestDeleteUser());
            return WebAPIUtils.deleteUser(user)
                .then((data) => {
                    console.log(data);
                    if (data.errors) {
                        dispatch(receiveDeleteUsersError(data.messages));
                    } else {
                        dispatch(receiveDeleteUsersSucess([data.data.data], user.slug));
                    }
                })
                .catch((error) => {
                    const errorData = [];
                    if (error.response) {
                        errorData.push(error.response.data);
                    } else {
                        errorData.push(error.message);
                    }
                    dispatch(receiveDeleteUsersError(errorData));
                });
        };
    },

    /**
     * Filter user by field
     *
     * @param text
     *
     * @param field
     *
     * @returns {{type: string, filter: {field: *, field: *}}}
     */
    filterUsers(text, field) {
        return {
            type: ActionTypes.FILTER_USER,
            filter: {
                field,
                text
            }
        };
    },

    /**
     * Sort user by field
     *
     * @param direction
     *
     * @param field
     *
     * @returns {{type: string, sort: {direction: *, field: *}}}
     */
    sortUsers(direction, field) {
        return {
            type: ActionTypes.SORT_USER,
            sort: {
                direction,
                field
            }
        };
    }
};

export default AppActions;
