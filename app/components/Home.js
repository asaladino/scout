// @flow
import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import Link from 'react-router-dom/es/Link';
import routes from '../constants/routes';

type Props = {};

type State = {};

export default class Home extends Component<Props, State> {
    props: Props;

    render = () => (
        <div data-tid="container">
            <p>
                Home. Should have a button and list to load the most recent
                reports workspace.
            </p>
            <Button
                component={Link}
                variant="contained"
                type="button"
                to={routes.SCAN}
            >
                Scan
            </Button>
        </div>
    );
}
