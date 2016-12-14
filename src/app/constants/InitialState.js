/**
 * Initial states for reducers
 *
 * @type {Object}
 */
const InitialState = {
    template: 0,
    expanded: false,
    users: {
        error: false,
        errorMessages: [],
        loading: false,
        users: []
    }
};

export default InitialState;
