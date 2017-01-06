/**
 * Initial states for reducers
 *
 * @type {Object}
 */
const InitialState = {
    template: 0,
    labels: {
        asac: [],
        boat: [],
        dive: [],
        group: [],
        invoice: [],
        insurance: [],
        origin: [],
        role: [],
        subscription: []
    },
    layout: {
        menuExpanded: false,
        blockExpand: false
    },
    users: {
        loading: false,
        users: [],
        deleting: {},
        validationError: false,
        validationMessages: {},
        filter: {
            text: '',
            field: ''
        },
        sort: {
            direction: 'asc',
            field: 'name'
        },
        user: {}
    },
    notification: {
        open: false,
        type: null,
        messages: []
    }
};

export default InitialState;
