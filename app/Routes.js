import React from 'react';
import { Switch, Route } from 'react-router';
import routes from './constants/routes';
import App from './containers/App';

import A11y from './containers/pages/A11y';
import BrokenLinks from './containers/pages/BrokenLinks';
import Dashboard from './containers/pages/Dashboard';
import Home from './containers/pages/HomePage';
import Lighthouse from './containers/pages/Lighthouse';
import ScanPage from './containers/pages/ScanPage';
import Settings from './containers/pages/Settings';

export default () => (
    <App>
        <Switch>
            <Route path={routes.SCAN} component={ScanPage} />
            <Route path={routes.HOME} component={Home} />
            <Route path={routes.A11Y} component={A11y} />
            <Route path={routes.BROKEN_LINKS} component={BrokenLinks} />
            <Route path={routes.DASHBOARD} component={Dashboard} />
            <Route path={routes.LIGHTHOUSE} component={Lighthouse} />
            <Route path={routes.SETTINGS} component={Settings} />
        </Switch>
    </App>
);
