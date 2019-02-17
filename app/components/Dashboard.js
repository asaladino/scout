// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';

type Props = {};

type State = {
    value: number
};

const styles = {
    root: {
        flexGrow: 1
    }
};

class Dashboard extends Component<Props, State> {
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <Typography component="div" style={{ padding: 8 * 3 }}>
                    Some information about the whole scan.
                </Typography>
            </div>
        );
    }
}

export default connect(state => ({
    project: state.project
}))(withStyles(styles)(Dashboard));
