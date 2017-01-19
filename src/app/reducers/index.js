import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import { reducer as form } from 'redux-form';

import labels from './labelsReducer';
import template from './templateReducer';
import layout from './layoutReducer';
import users from './usersReducer';
import notification from './notificationReducer';

/**
 * Combine reducers
 */
const rootReducer = combineReducers({
    form,
    labels,
    template,
    layout,
    users,
    notification,
    routing
});

export default rootReducer;
