// @flow
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';
import LeftMenu from '../../components/LeftMenu';
import TopToolbar from '../../components/TopToolbar';
import Seo from '../../components/Seo';

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

class SeoPage extends Component<Props, State> {
    props: Props;

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <TopToolbar />
                <LeftMenu />
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    <Seo />
                </main>
            </div>
        );
    }
}

export default withStyles(styles)(SeoPage);
