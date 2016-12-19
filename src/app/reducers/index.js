import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

import template from './templateReducer';
import expanded from './layoutReducer';
import users from './usersReducer';
import notification from './notificationReducer';

/**
 * Combine reducers
 */
const rootReducer = combineReducers({
    template,
    expanded,
    users,
    notification,
    routing
});

export default rootReducer;
