/**
 * Initial states for reducers
 *
 * @type {Object}
 */
const InitialState = {
    template: 0,
    layout: {
        menuExpanded: false,
        blockExpand: false
    },
    users: {
        loading: false,
        users: [],
        deleting: {},
        filter: {
            text: '',
            field: ''
        },
        sort: {
            direction: 'asc',
            field: 'name'
        }
    },
    notification: {
        open: false,
        type: null,
        messages: []
    }
};

export default InitialState;
