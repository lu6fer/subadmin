import React from 'react';
import { Route, IndexRoute, Redirect } from 'react-router';

import Template from './containers/Template/Template';
import Layout from './containers/Layout/Layout';

import Users from './containers/Users/Users';
import UsersAdd from './containers/Users/Add/Add';

/**
 * Define routes
 */
const routes = (
    <Route path="/" component={Layout}>
        <IndexRoute component={Template} />
        <Route path="utilisateurs" component={Users}>
            <Route path="ajout" component={UsersAdd} />
        </Route>
        <Redirect from="*" to="/" />
    </Route>
);

export default routes;
