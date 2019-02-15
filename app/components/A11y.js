// @flow
import React, { Component } from 'react';

import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

function TabContainer(props) {
    return (
        <Typography component="div" style={{ padding: 8 * 3 }}>
            {props.children}
        </Typography>
    );
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired
};

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
            <Paper className={classes.root}>
                <Tabs
                    value={value}
                    onChange={this.handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    centered
                >
                    <Tab label="Item One" />
                    <Tab label="Item Two" />
                </Tabs>
                {value === 0 && <TabContainer>Item One</TabContainer>}
                {value === 1 && <TabContainer>Item Two</TabContainer>}
            </Paper>
        );
    }
}

A11y.propTypes = {
    classes: PropTypes.object.isRequired
};

export default connect(state => ({
    project: state.project
}))(withStyles(styles)(A11y));
