// @flow
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import Scan from '../../components/Scan';
import TopToolbar from '../../components/TopToolbar';
import LeftMenu from '../../components/LeftMenu';

type Props = {};

type State = {};

const styles = theme => ({
    root: {
        display: 'flex'
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3
    },
    toolbar: theme.mixins.toolbar
});

class ScanPage extends Component<Props, State> {
    props: Props;

    render = () => {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <CssBaseline />
                <TopToolbar />
                <LeftMenu />
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    <Scan />
                </main>
            </div>
        );
    };
}

export default withStyles(styles)(ScanPage);
