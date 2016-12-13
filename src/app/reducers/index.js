import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

import template from './templateReducer';
import expanded from './layoutReducer';

/**
 * Combine reducers
 */
const rootReducer = combineReducers({
    template,
    expanded,
    routing
});

export default rootReducer;
