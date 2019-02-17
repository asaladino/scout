import React from 'react';
import { Switch, Route } from 'react-router';
import routes from './constants/routes';
import App from './containers/App';

import A11yPage from './containers/pages/A11yPage';
import BrokenLinksPage from './containers/pages/BrokenLinksPage';
import DashboardPage from './containers/pages/DashboardPage';
import HomePage from './containers/pages/HomePage';
import BestPracticesPage from './containers/pages/BestPracticesPage';
import PwaPage from './containers/pages/PwaPage';
import SeoPage from './containers/pages/SeoPage';
import ScanPage from './containers/pages/ScanPage';
import OptionsPage from './containers/pages/OptionsPage';

export default () => (
    <App>
        <Switch classes="">
            <Route path={routes.HOME} exact component={HomePage} />
            <Route path={routes.DASHBOARD} exact component={DashboardPage} />
            <Route path={routes.A11Y} exact component={A11yPage} />
            <Route
                path={routes.BROKEN_LINKS}
                exact
                component={BrokenLinksPage}
            />
            <Route
                path={routes.BEST_PRACTICES}
                exact
                component={BestPracticesPage}
            />
            <Route path={routes.PWA} exact component={PwaPage} />
            <Route path={routes.SEO} exact component={SeoPage} />
            <Route path={routes.SCAN} exact component={ScanPage} />
            <Route path={routes.OPTIONS} exact component={OptionsPage} />
        </Switch>
    </App>
);
