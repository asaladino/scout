// @flow
import React, { Component } from 'react';
import { Grid, LinearProgress, Button, TextField } from '@material-ui/core';
import { FolderOpen } from '@material-ui/icons';

import electron from 'electron';

type Props = {};

type State = {};

export default class Home extends Component<Props, State> {
    props: Props;

    render = () => {
        return (
            <div data-tid="container">
                Home. Should have a button and list to load the most recent reports workspace.
            </div>
        );
    };
}
