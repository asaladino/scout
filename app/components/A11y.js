// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import withStyles from '@material-ui/core/styles/withStyles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
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

class A11y extends Component<Props, State> {
    state = {
        value: 0
    };

    handleChange = (event, value) => {
        this.setState({ value });
    };

    render() {
        const { classes } = this.props;
        const { value } = this.state;
        return (
            <div className={classes.root}>
                <Tabs
                    value={value}
                    onChange={this.handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    centered
                >
                    <Tab label="Overview" />
                    <Tab label="Details" />
                </Tabs>
                {value === 0 && (
                    <Typography component="div" style={{ padding: 8 * 3 }}>
                        Some aggregate information about the a11y scan.
                    </Typography>
                )}
                {value === 1 && (
                    <Typography component="div" style={{ padding: 8 * 3 }}>
                        Detailed a11y information about a specific page.
                    </Typography>
                )}
            </div>
        );
    }
}

export default connect(state => ({
    project: state.project
}))(withStyles(styles)(A11y));
