// @flow
import React, { Component } from 'react';
import { Grid, LinearProgress, Button, TextField } from '@material-ui/core';
import { FolderOpen } from '@material-ui/icons';

type Props = {};

type State = {};

export default class Dashboard extends Component<Props, State> {
    props: Props;

    render = () => {
        return (
            <div>
                <div>toolbar</div>
                <div>menu</div>
                <div>Dashboard</div>
            </div>
        );
    }
}