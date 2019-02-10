// @flow
import React, { Component } from 'react';
import { Grid, LinearProgress, Button, TextField } from '@material-ui/core';
import { FolderOpen } from '@material-ui/icons';

type Props = {};

type State = {}

export default Settings extends Component<Props, State> {
    props: Props;

    constructor(props: Props) {
        this.props = props;
    }

    render = () => {
        return (
            <div>
                <div>toolbar</div>
                <div>menu</div>
                <div>reports</div>
            </div>
        );
    }
}