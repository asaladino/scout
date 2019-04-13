// @flow
import React, { Component } from "react";
import {
    Grid,
    LinearProgress,
    Button,
    TextField,
    withStyles
} from "@material-ui/core";

import IndexController from "site-index/lib/Controller/IndexController";
import IndexArgs from "site-index/lib/Model/Args";

import ContentController from "site-content/lib/Controller/ContentController";
import ContentArgs from "site-content/lib/Model/Args";

import BrokenLinksController from "site-broken-links/lib/Controller/BrokenLinksController";
import BrokenLinksArgs from "site-broken-links/lib/Model/Args";

import A11yController from "site-a11y/lib/Controller/A11yController";
import A11yArgs from "site-a11y/lib/Model/Args";

import FileDetails from "site-index/lib/Model/FileDetails";

import { connect } from "react-redux";

import PropTypes from "prop-types";

type Props = {};

type State = {
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

const styles = theme => ({});

class Scan extends Component<Props, State> {
    props: Props;

    constructor(props: Props) {
        super(props);
        this.state = {
            overallCompleted: 0,
            overallTotal: 4,
            overStatus: "",
            taskCompleted: 0,
            taskTotal: 100,
            taskStatus: ""
        };
        this.startIndex = this.startIndex.bind(this);
        this.startContents = this.startContents.bind(this);
        this.startBrokenLinks = this.startBrokenLinks.bind(this);
        this.startA11y = this.startA11y.bind(this);
        this.setDomain = this.setDomain.bind(this);
    }

    async startIndex() {
        const { domain, folder } = this.props.project;
        this.setState({ overStatus: `Indexing ${domain}` });
        const args = new IndexArgs({
            domain,
            output: new FileDetails(folder),
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
                    taskStatus: "",
                    taskTotal: 100,
                    taskCompleted: 100
                });
                this.startContents();
                return true;
            })
            .catch(error => {
                console.log(error);
                this.setState({ overStatus: `Error indexing ${domain}` });
            });
    }

    startContents = () => {
        const { domain, folder } = this.props.project;
        this.setState({ overStatus: `Contents ${domain}` });
        const args = new ContentArgs({
            domain,
            output: new FileDetails(folder),
            verbose: false
        });
        const controller = new ContentController(args);
        controller
            .start((event, progress: Progress) => {
                if (progress) {
                    let message = { url: "" };
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
                    taskStatus: "",
                    taskTotal: 100,
                    taskCompleted: 100
                });
                this.startBrokenLinks();
                return true;
            })
            .catch(() => {
                this.setState({
                    overStatus: `Error extracting contents ${domain}`
                });
            });
    };

    startBrokenLinks = () => {
        const { domain, folder } = this.props.project;
        this.setState({ overStatus: `Broken Links ${domain}` });
        const args = new BrokenLinksArgs({
            domain,
            output: new FileDetails(folder),
            verbose: false
        });
        const controller = new BrokenLinksController(args);
        controller
            .start((event, progress: Progress) => {
                if (progress) {
                    let message = { url: "" };
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
                    overStatus: `Done checking broken links ${domain}`,
                    overallCompleted: 3,
                    taskStatus: "",
                    taskTotal: 100,
                    taskCompleted: 100
                });
                this.startA11y();
                return true;
            })
            .catch((error) => {
                console.log(error);
                this.setState({
                    overStatus: `Error checking broken links ${domain}`
                });
            });
    };

    startA11y = () => {
        const { domain, folder } = this.props.project;
        this.setState({ overStatus: `A11y ${domain}` });
        const args = new A11yArgs({
            domain,
            output: new FileDetails(folder),
            verbose: false,
            remote: true
        });
        const controller = new A11yController(args);
        controller
            .start((event, progress: Progress) => {
                if (progress) {
                    let message = { url: "" };
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
                    overStatus: `Done checking a11y ${domain}`,
                    overallCompleted: 4,
                    taskStatus: "",
                    taskTotal: 100,
                    taskCompleted: 100
                });
                return true;
            })
            .catch((error) => {
                console.log(error);
                this.setState({
                    overStatus: `Error checking a11y ${domain}`
                });
            });
    };

    setDomain = (event: Event) => {
        this.setState({
            domain: event.target.value
        });
    };

    render = () => {
        const {
            overallCompleted,
            overallTotal,
            overStatus,
            taskCompleted,
            taskTotal,
            taskStatus
        } = this.state;
        const { domain, folder } = this.props.project;
        return (
            <div data-tid="container">
                <Grid container spacing={16}>
                    <Grid item xs={8}>
                        <TextField fullWidth value={domain} type="text" label="Domain"/>
                    </Grid>
                    <Grid item xs={8}>
                        <TextField fullWidth type="text" value={folder} label="Output Folder"/>
                    </Grid>
                    <Grid item xs={12}>
                        <Button onClick={this.startIndex} variant="contained" type="button">
                            Start Scan
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <div>{overStatus}</div>
                        <LinearProgress variant="determinate"
                                        value={(() => Math.min((overallCompleted / overallTotal) * 100))()}/>
                        <br/>
                        <LinearProgress color="secondary" variant="determinate"
                                        value={(() => Math.min((taskCompleted / taskTotal) * 100))()}
                                        valueBuffer={taskTotal}/>
                        <div>{taskStatus}</div>
                    </Grid>
                </Grid>
            </div>
        );
    };
}

Scan.propTypes = {
    classes: PropTypes.object.isRequired
};

export default connect(state => ({
    project: state.project
}))(withStyles(styles)(Scan));
