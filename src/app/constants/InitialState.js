/**
 * Initial states for reducers
 *
 * @type {Object}
 */
const InitialState = {
    template: 0,
    expanded: false,
    users: {
        loading: false,
        users: [],
        error: {
            status: false,
            messages: []
        },
        filter: {
            text: '',
            field: ''
        },
        sort: {
            direction: 'asc',
            field: 'name'
        }
    }
};

export default InitialState;
