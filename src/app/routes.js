import React from 'react';
import { Route, IndexRoute } from 'react-router';

import Template from './containers/Template/Template';
import Layout from './containers/Layout/Layout';

import Users from './containers/Users/Users';

/**
 * Define routes
 */
const routes = (
    <Route path="/" component={Layout}>
        <IndexRoute component={Template} />
        <Route path="users" component={Users} />
    </Route>
);

export default routes;
