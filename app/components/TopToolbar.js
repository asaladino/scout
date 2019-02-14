import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import FilledInput from '@material-ui/core/FilledInput';
import MenuItem from '@material-ui/core/MenuItem';
import { Redirect } from 'react-router';
import routes from '../constants/routes';
import actions from '../constants/actions';

type Props = {};
type State = {};

const styles = theme => ({
    appBar: {
        zIndex: theme.zIndex.drawer + 1
    },
    grow: {
        flexGrow: 1
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block'
        }
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25)
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing.unit,
            width: 'auto'
        }
    },
    searchIcon: {
        width: theme.spacing.unit * 9,
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    inputRoot: {
        color: 'inherit',
        width: '100%'
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120
    },
    inputInput: {
        MuiFilledInput: {
            input: {
                padding: 0
            }
        }
    }
});

class TopToolbar extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange = event => {
        this.props.dispatch({
            type: actions.project.SET_DOMAIN,
            data: { domain: event.target.value }
        });
    };

    render = () => {
        const { classes, project } = this.props;
        if (project.folder === '') {
            return <Redirect to={routes.HOME} />;
        }
        return (
            <div className={classes.root}>
                <AppBar position="fixed" className={classes.appBar}>
                    <Toolbar>
                        <Typography
                            className={classes.title}
                            variant="h6"
                            color="inherit"
                            noWrap
                        >
                            Workspace Name
                        </Typography>
                        <div className={classes.grow} />
                        <div>
                            <FormControl
                                variant="standard"
                                className={classes.formControl}
                            >
                                <Select
                                    value={project.domain}
                                    onChange={this.handleChange}
                                    className={classes.inputInput}
                                    input={
                                        <FilledInput
                                            name="domain"
                                        />
                                    }
                                >
                                    {project.domains.map(domain => (
                                        <MenuItem key={domain} value={domain}>
                                            {domain}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </div>
                    </Toolbar>
                </AppBar>
            </div>
        );
    };
}

TopToolbar.propTypes = {
    classes: PropTypes.object.isRequired
};

export default connect(state => ({
    project: state.project
}))(withStyles(styles)(TopToolbar));
