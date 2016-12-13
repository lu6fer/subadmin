import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';

import configureStore from './store/configureStore';
import routes from './routes';
import AppActions from './actions/AppActions';

let store;
let history;
const subadminTheme = getMuiTheme(darkBaseTheme);

const App = {
    /**
     * Run application
     */
    run() {
        // create store
        store = configureStore();

        // create browser history for router
        history = syncHistoryWithStore(browserHistory, store);

        injectTapEventPlugin();
        // render aplication
        ReactDOM.render(
            <AppContainer key={Math.random()}>
                <MuiThemeProvider muiTheme={subadminTheme}>
                    <Provider store={store}>
                        <Router history={history}>{routes}</Router>
                    </Provider>
                </MuiThemeProvider>
            </AppContainer>,
            document.getElementById('container')
        );

        // dispatch initialize action
        store.dispatch(AppActions.initialize());
    }
};


if (module.hot) {
    module.hot.accept('./routes', () => {
        const nextRoutes = require('./routes').default;

        injectTapEventPlugin();
        ReactDOM.render(
            <AppContainer key={Math.random()}>
                <MuiThemeProvider muiTheme={subadminTheme}>
                    <Provider store={store}>
                        <Router history={history}>{nextRoutes}</Router>
                    </Provider>
                </MuiThemeProvider>
            </AppContainer>,
            document.getElementById('container')
        );
    });
}

export default App;
