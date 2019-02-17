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

class Options extends Component<Props, State> {
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
                    <Tab label="Index" />
                    <Tab label="A11y" />
                </Tabs>
                {value === 0 && (
                    <Typography component="div" style={{ padding: 8 * 3 }}>
                        Select some options for indexing.
                    </Typography>
                )}
                {value === 1 && (
                    <Typography component="div" style={{ padding: 8 * 3 }}>
                        Select some options for a11y.
                    </Typography>
                )}
            </div>
        );
    }
}

export default connect(state => ({
    project: state.project
}))(withStyles(styles)(Options));
