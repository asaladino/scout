// @flow
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';
import CssBaseline from './ScanPage';
import TopToolbar from '../../components/TopToolbar';
import LeftMenu from '../../components/LeftMenu';
import A11y from "../../components/A11y";

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

class A11yPage extends Component<Props, State> {
    props: Props;

    render = () => {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <TopToolbar />
                <LeftMenu />
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    <A11y />
                </main>
            </div>
        );
    };
}

export default withStyles(styles)(A11yPage);
