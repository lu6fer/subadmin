import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

import template from './templateReducer';
import expanded from './layoutReducer';
import users from './usersReducer';

/**
 * Combine reducers
 */
const rootReducer = combineReducers({
    template,
    expanded,
    users,
    routing
});

export default rootReducer;
