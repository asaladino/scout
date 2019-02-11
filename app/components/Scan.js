// @flow
import React, { Component } from 'react';
import { Grid, LinearProgress, Button, TextField } from '@material-ui/core';
import { FolderOpen } from '@material-ui/icons';

import IndexController from 'site-index/lib/Controller/IndexController';
import IndexArgs from 'site-index/lib/Model/Args';

import ContentController from 'site-content/lib/Controller/ContentController';
import ContentArgs from 'site-content/lib/Model/Args';

import FileDetails from 'site-index/lib/Model/FileDetails';

import electron from 'electron';

type Props = {};

type State = {
    domain: string,
    output: string,
    overallCompleted: number,
    overallTotal: number,
    overStatus: string,
    taskCompleted: number,
    taskTotal: number,
    taskStatus: string
};

type ProgressIndex = {
    url: { url: string },
    urls: number,
    urlsPool: number
};

type Progress = {
    url: { url: string },
    total: number,
    progress: number
};

type Event = {
    target: { value: string }
};

export default class Scan extends Component<Props, State> {
    props: Props;

    constructor(props: Props) {
        super(props);
        this.state = {
            domain: 'codingsimply.com',
            output: 'C:\\Users\\Adam\\Documents\\programming\\reports',
            overallCompleted: 0,
            overallTotal: 2,
            overStatus: '',
            taskCompleted: 0,
            taskTotal: 100,
            taskStatus: ''
        };
        this.startIndex = this.startIndex.bind(this);
        this.startContents = this.startContents.bind(this);
        this.setDomain = this.setDomain.bind(this);
    }

    startIndex = () => {
        const { domain, output } = this.state;
        this.setState({ overStatus: `Indexing ${domain}` });
        const args = new IndexArgs({
            domain,
            output: new FileDetails(output),
            verbose: false,
            html: true
        });
        const controller = new IndexController(args);
        controller
            .start((event, progress: ProgressIndex) => {
                if (progress) {
                    this.setState({
                        overallCompleted: 0,
                        taskStatus: `${progress.url.url}`,
                        taskTotal: progress.urls + progress.urlsPool,
                        taskCompleted: progress.urls
                    });
                }
            })
            .then(() => {
                this.setState({
                    overStatus: `Done indexing ${domain}`,
                    overallCompleted: 1,
                    taskStatus: '',
                    taskTotal: 100,
                    taskCompleted: 100
                });
                this.startContents();
                return true;
            })
            .catch(() => {
                this.setState({ overStatus: `Error indexing ${domain}` });
            });
    };

    startContents = () => {
        const { domain, output } = this.state;
        this.setState({ overStatus: `Contents ${domain}` });
        const args = new ContentArgs({
            domain,
            output: new FileDetails(output),
            verbose: false
        });
        const controller = new ContentController(args);
        controller
            .start((event, progress: Progress) => {
                if (progress) {
                    let message = { url: '' };
                    if (progress.url !== null) {
                        const { url } = progress;
                        message = url;
                    }
                    this.setState({
                        taskStatus: `${message.url}`,
                        taskTotal: progress.total,
                        taskCompleted: progress.progress
                    });
                }
            })
            .then(() => {
                this.setState({
                    overStatus: `Done extracting contents ${domain}`,
                    overallCompleted: 2,
                    taskStatus: '',
                    taskTotal: 100,
                    taskCompleted: 100
                });
                return true;
            })
            .catch(() => {
                this.setState({
                    overStatus: `Error extracting contents ${domain}`
                });
            });
    };

    outputFolder = () => {
        const output = electron.remote.dialog.showOpenDialog({
            properties: ['openDirectory']
        });
        if (output) {
            this.setState({ output: output[0] });
        }
    };

    setDomain = (event: Event) => {
        this.setState({
            domain: event.target.value
        });
    };

    render = () => {
        const {
            domain,
            output,
            overallCompleted,
            overallTotal,
            overStatus,
            taskCompleted,
            taskTotal,
            taskStatus
        } = this.state;
        return (
            <div data-tid="container">
                <Grid container spacing={16}>
                    <Grid item xs={8}>
                        <TextField
                            fullWidth
                            value={domain}
                            type="text"
                            onChange={this.setDomain}
                            label="Domain"
                        />
                    </Grid>
                    <Grid item xs={8}>
                        <TextField
                            fullWidth
                            type="text"
                            value={output}
                            label="Output Folder"
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <Button
                            onClick={this.outputFolder}
                            variant="contained"
                            type="button"
                        >
                            <FolderOpen />
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            onClick={this.startIndex}
                            variant="contained"
                            type="button"
                        >
                            Start Scan
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <div>{overStatus}</div>
                        <LinearProgress
                            variant="determinate"
                            value={(() =>
                                Math.min(
                                    (overallCompleted / overallTotal) * 100
                                ))()}
                        />
                        <br />
                        <LinearProgress
                            color="secondary"
                            variant="determinate"
                            value={(() =>
                                Math.min((taskCompleted / taskTotal) * 100))()}
                            valueBuffer={taskTotal}
                        />
                        <div>{taskStatus}</div>
                    </Grid>
                </Grid>
            </div>
        );
    };
}
