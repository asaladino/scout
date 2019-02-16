// @flow
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';
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

class BrokenLinksPage extends Component<Props, State> {
    props: Props;

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <TopToolbar />
                <LeftMenu />
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    Broken Links
                </main>
            </div>
        );
    }
}

export default withStyles(styles)(BrokenLinksPage);
