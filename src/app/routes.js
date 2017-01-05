import React from 'react';
import { Route, IndexRoute, Redirect } from 'react-router';

import Template from 'containers/Template/Template';
import Layout from 'containers/Layout/Layout';

import Users from 'containers/Users/Users';
import UserAdd from 'containers/Users/Add/Add';
import UserEdit from 'containers/Users/Edit/Edit';

/**
 * Define routes
 */
const routes = (
    <Route path="/" component={Layout}>
        <IndexRoute component={Template} />
        <Route path="utilisateurs" component={Users}>
            <Route path="ajout" component={UserAdd} />
            <Route path="edition/:userSlug" component={UserEdit} />
        </Route>
        <Redirect from="*" to="/" />
    </Route>
);

export default routes;
