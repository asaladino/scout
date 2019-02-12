// @flow
import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import Link from 'react-router-dom/es/Link';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import routes from '../constants/routes';

type Props = {};

type State = {};

const styles = theme => ({
    root: {
        position: 'absolute',
        height: '100%',
        width: '100%'
    },
    paper: {
        padding: theme.spacing.unit * 2,
        color: theme.palette.text.secondary,
        width: 600,
        height: 400,
        margin: 'auto',
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginLeft: -300,
        marginTop: -200
    }
});

function generate(element) {
    return [0, 1, 2].map(value =>
        React.cloneElement(element, {
            key: value
        })
    );
}

class Home extends Component<Props, State> {
    props: Props;

    state = {
        dense: false,
        secondary: false
    };

    render = () => {
        const { classes } = this.props;
        const { dense, secondary } = this.state;

        return (
            <div className={classes.root}>
                <Paper className={classes.paper}>
                    <Typography variant="h4" component="h3">
                        Welcome to Scout
                    </Typography>
                    <Grid container>
                        <Grid item md={6}>
                            <Typography variant="h6" className={classes.title}>
                                Previous Projects
                            </Typography>
                            <div className={classes.demo}>
                                <List dense={dense}>
                                    {generate(
                                        <ListItem>
                                            <ListItemText
                                                primary="Single-line item"
                                                secondary={
                                                    secondary
                                                        ? 'Secondary text'
                                                        : null
                                                }
                                            />
                                        </ListItem>
                                    )}
                                </List>
                            </div>
                        </Grid>

                        <Grid item xs={6} md={6}>
                            <Button
                                variant="contained"
                                type="button"
                            >
                                Open Project Folder...
                            </Button>
                            <hr/>
                            <Button
                                component={Link}
                                variant="contained"
                                type="button"
                                to={routes.SCAN}
                            >
                                Scan
                            </Button>
                        </Grid>
                    </Grid>
                </Paper>
            </div>
        );
    };
}

export default withStyles(styles)(Home);
