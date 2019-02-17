import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import {
    Dashboard as DashboardIcon,
    LinkOff as BrokenLinksIcon,
    Accessibility as A11yIcon,
    FlashOn as SeoIcon,
    Scanner as ScannerIcon,
    Settings as OptionsIcon,
    LocalPlay as BestPracticesIcon,
    TouchApp as PwaIcon
} from '@material-ui/icons';

import Link from 'react-router-dom/es/Link';
import routes from '../constants/routes';

const drawerWidth = 280;

const styles = theme => ({
    root: {
        display: 'flex'
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0
    },
    drawerPaper: {
        width: drawerWidth
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3
    },
    toolbar: theme.mixins.toolbar
});

type Props = {};
type State = {};

class LeftMenu extends Component<Props, State> {
    componentWillMount(): void {}

    render = () => {
        const { classes, page } = this.props;
        return (
            <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{
                    paper: classes.drawerPaper
                }}
            >
                <div className={classes.toolbar} />
                <List>
                    <ListItem
                        component={page === routes.DASHBOARD ? 'div' : Link}
                        to={routes.DASHBOARD}
                        selected={page === routes.DASHBOARD}
                    >
                        <ListItemIcon>
                            <DashboardIcon />
                        </ListItemIcon>
                        <ListItemText primary="Dashboard" />
                    </ListItem>
                    <Divider />
                    <ListItem
                        component={page === routes.BROKEN_LINKS ? 'div' : Link}
                        to={routes.BROKEN_LINKS}
                        selected={page === routes.BROKEN_LINKS}
                    >
                        <ListItemIcon>
                            <BrokenLinksIcon />
                        </ListItemIcon>
                        <ListItemText primary="Broken Links" />
                    </ListItem>
                    <ListItem
                        component={page === routes.A11Y ? 'div' : Link}
                        to={routes.A11Y}
                        selected={page === routes.A11Y}
                    >
                        <ListItemIcon>
                            <A11yIcon />
                        </ListItemIcon>
                        <ListItemText primary="Accessibility" />
                    </ListItem>
                    <ListItem
                        component={
                            page === routes.BEST_PRACTICES ? 'div' : Link
                        }
                        to={routes.BEST_PRACTICES}
                        selected={page === routes.BEST_PRACTICES}
                    >
                        <ListItemIcon>
                            <BestPracticesIcon />
                        </ListItemIcon>
                        <ListItemText primary="Best Practices" />
                    </ListItem>
                    <ListItem
                        component={page === routes.PWA ? 'div' : Link}
                        to={routes.PWA}
                        selected={page === routes.PWA}
                    >
                        <ListItemIcon>
                            <PwaIcon />
                        </ListItemIcon>
                        <ListItemText primary="Progressive Web App" />
                    </ListItem>
                    <ListItem
                        component={page === routes.SEO ? 'div' : Link}
                        to={routes.SEO}
                        selected={page === routes.SEO}
                    >
                        <ListItemIcon>
                            <SeoIcon />
                        </ListItemIcon>
                        <ListItemText primary="SEO" />
                    </ListItem>
                </List>
                <Divider />
                <List>
                    <ListItem
                        component={page === routes.SCAN ? 'div' : Link}
                        to={routes.SCAN}
                        selected={page === routes.SCAN}
                    >
                        <ListItemIcon>
                            <ScannerIcon />
                        </ListItemIcon>
                        <ListItemText primary="Scan" />
                    </ListItem>
                    <ListItem
                        component={page === routes.OPTIONS ? 'div' : Link}
                        to={routes.OPTIONS}
                        selected={page === routes.OPTIONS}
                    >
                        <ListItemIcon>
                            <OptionsIcon />
                        </ListItemIcon>
                        <ListItemText primary="Options" />
                    </ListItem>
                </List>
            </Drawer>
        );
    };
}

export default connect(props => ({
    page: props.router.location.pathname
}))(withStyles(styles)(LeftMenu));
