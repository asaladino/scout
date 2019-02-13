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
    Dashboard,
    LinkOff,
    Accessibility,
    FlashOn,
    Scanner,
    Settings
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
                    <ListItem button>
                        <ListItemIcon>
                            <Dashboard />
                        </ListItemIcon>
                        <ListItemText primary="Dashboard" />
                    </ListItem>
                    <Divider />
                    <ListItem button>
                        <ListItemIcon>
                            <LinkOff />
                        </ListItemIcon>
                        <ListItemText primary="Broken Links" />
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon>
                            <Accessibility />
                        </ListItemIcon>
                        <ListItemText primary="Accessibility" />
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon>
                            <FlashOn />
                        </ListItemIcon>
                        <ListItemText primary="Best Practices" />
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon>
                            <FlashOn />
                        </ListItemIcon>
                        <ListItemText primary="Progressive Web App" />
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon>
                            <FlashOn />
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
                            <Scanner />
                        </ListItemIcon>
                        <ListItemText primary="Scan" />
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon>
                            <Settings />
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
