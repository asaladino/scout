// @flow
import React, { Component } from 'react';
import { Grid, LinearProgress, Button, TextField } from '@material-ui/core';
import { FolderOpen } from '@material-ui/icons';

type Props = {};

type State = {};

export default class A11y extends Component<Props, State> {
    props: Props;

    render = () => {
        return (
            <div>
                <div>toolbar</div>
                <div>menu</div>
                <div>Accessibility</div>
            </div>
        );
    }
}