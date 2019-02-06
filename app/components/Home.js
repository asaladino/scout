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

// import { Link } from 'react-router-dom';
// import routes from '../constants/routes';
import styles from './Home.css';

type Props = {};

type Progress = {
  url: { url: string },
  urls: number,
  urlsPool: number
};

type Event = {
  target: { value: string }
};

export default class Home extends Component<Props, Progress> {
  props: Props;

  constructor(props: Props) {
    super(props);
    this.state = {
      domain: '',
      output: '',
      overallCompleted: 0,
      overallTotal: 6,
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
      .start((event, progress: Progress) => {
        if (progress) {
          this.setState({
            taskStatus: `${progress.url.url}`,
            taskTotal: progress.urls + progress.urlsPool,
            taskCompleted: progress.urls
          });
        }
      })
      .then(() => {
        this.setState({
          overStatus: `Done indexing ${domain}`,
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
    console.log(args);
    const controller = new ContentController(args);
    controller
      .start((event, progress: Progress) => {
        console.log(progress);
        if (progress) {
        }
      })
      .then(() => {
        this.setState({
          overStatus: `Done extracting contents ${domain}`,
          taskStatus: '',
          taskTotal: 100,
          taskCompleted: 100
        });
        return true;
      })
      .catch(() => {
        this.setState({ overStatus: `Error extracting contents ${domain}` });
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
      output,
      overallCompleted,
      overallTotal,
      overStatus,
      taskCompleted,
      taskTotal,
      taskStatus
    } = this.state;
    return (
      <div className={styles.container} data-tid="container">
        <Grid container spacing={16}>
          <Grid item xs={12}>
            <h2>Scan a site</h2>
          </Grid>
          <Grid item xs={8}>
            <TextField
              fullWidth
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
            <Button onClick={this.startIndex} variant="contained" type="button">
              Start Scan
            </Button>
          </Grid>
          <Grid item xs={12}>
            <div>{overStatus}</div>
            <LinearProgress
              variant="determinate"
              value={overallCompleted}
              valueBuffer={overallTotal}
            />
            <br />
            <LinearProgress
              color="secondary"
              variant="determinate"
              value={taskCompleted}
              valueBuffer={taskTotal}
            />
            <div>{taskStatus}</div>
          </Grid>
        </Grid>
      </div>
    );
  };
}
