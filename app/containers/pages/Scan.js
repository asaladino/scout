// @flow
import React, { Component } from 'react';
import { Grid, LinearProgress, Button, TextField } from '@material-ui/core';
import { FolderOpen } from '@material-ui/icons';

import Scan from '../../components/Scan';

type Props = {};

type State = {};

export default Scan extends Component<Props, State> {
    props: Props;

    render = () => {
        return (
            <div>
                <div>toolbar</div>
                <div>menu</div>
                <div>
                    <Scan/>
                </div>
            </div>
        );
    }
}