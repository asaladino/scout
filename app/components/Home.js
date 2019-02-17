// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from '@material-ui/core';
import Link from 'react-router-dom/es/Link';

import { FolderOpen } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import electron from 'electron';
import { Redirect } from 'react-router';
import routes from '../constants/routes';
import actions from '../constants/actions';

type Props = {
    dispatch: any => void
};

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
    },
    header: {
        marginTop: theme.spacing.unit * 6,
        marginBottom: theme.spacing.unit * 6,
        textAlign: 'center'
    },
    options: {
        width: '100%'
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

    constructor(props: Props) {
        super(props);
        this.state = {
            dense: false,
            secondary: false
        };
        this.outputFolder = this.outputFolder.bind(this);
    }

    outputFolder = () => {
        const output = electron.remote.dialog.showOpenDialog({
            properties: ['openDirectory']
        });
        if (output) {
            const { SET_FOLDER } = actions.project;
            this.props.dispatch({
                type: SET_FOLDER,
                data: { folder: output[0] }
            });
        }
    };

    render = () => {
        const { classes, project } = this.props;
        const { dense, secondary } = this.state;

        if (project.folder !== '') {
            return <Redirect to={routes.DASHBOARD} />;
        }

        return (
            <div className={classes.root}>
                <Paper className={classes.paper}>
                    <Typography
                        variant="h4"
                        component="h3"
                        className={classes.header}
                    >
                        Welcome to Scout
                    </Typography>
                    <Grid container spacing={8}>
                        <Grid item xs={6}>
                            <div className={classes.demo}>
                                <MenuList dense={dense}>
                                    {generate(
                                        <MenuItem>
                                            <ListItemText
                                                primary="Project "
                                                secondary={
                                                    secondary
                                                        ? 'Secondary text'
                                                        : null
                                                }
                                            />
                                        </MenuItem>
                                    )}
                                </MenuList>
                            </div>
                        </Grid>

                        <Grid item xs={6}>
                            <List>
                                <ListItem>
                                    <Button
                                        onClick={this.outputFolder}
                                        variant="contained"
                                        type="button"
                                        className={classes.options}
                                    >
                                        <FolderOpen />
                                        Open Project Folder...
                                    </Button>
                                </ListItem>
                                <ListItem>
                                    <Button
                                        component={Link}
                                        variant="contained"
                                        type="button"
                                        to={routes.SCAN}
                                        className={classes.options}
                                    >
                                        Scan
                                    </Button>
                                </ListItem>
                            </List>
                        </Grid>
                    </Grid>
                </Paper>
            </div>
        );
    };
}

export default connect(state => ({
    project: state.project
}))(withStyles(styles)(Home));
