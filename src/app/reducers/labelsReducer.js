import ActionTypes from '../constants/ActionTypes';
import InitialState from '../constants/InitialState';

/**
 * Label reducer, Get Labels
 */
export default function labelstReducer(state = InitialState.labels, action) {
    switch (action.type) {
        case ActionTypes.FETCH_LABELS_SUCCESS:
            return {
                ...state,
                asac: action.data.asac,
                boat: action.data.boat,
                dive: action.data.dive,
                group: action.data.group,
                invoice: action.data.invoice,
                insurance: action.data.insurance,
                origin: action.data.origin,
                role: action.data.role,
                subscription: action.data.subscription
            };
        default:
            return state;
    }
}
