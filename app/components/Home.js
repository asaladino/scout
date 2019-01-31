// @flow
import React, { Component } from 'react';
import Button from '@material-ui/core/Button';

import IndexController from 'site-index/lib/Controller/IndexController';
import IndexArgs from 'site-index/lib/Model/Args';
import FileDetails from 'site-index/lib/Model/FileDetails';

import { Link } from 'react-router-dom';
import routes from '../constants/routes';
import styles from './Home.css';

type Props = {};

export default class Home extends Component<Props> {
  props: Props;

  startIndex = () => {
    const indexArgs = new IndexArgs({
      domain: 'codingsimply.com',
      output: new FileDetails(
        'C:\\Users\\Adam\\Documents\\programming\\reports\\'
      )
    });
    console.log(indexArgs);
    const indexController = new IndexController(indexArgs);
    indexController
      .start((event, progress) => {
        console.log(event, progress);
      })
      .then(() => {
        console.log('finished');
        return true;
      })
      .catch(() => {
        console.log('error');
      });
  };

  render = () => (
    <div className={styles.container} data-tid="container">
      <h2>Home</h2>
      <Link to={routes.COUNTER}>to Counter</Link>
      <Button onClick={this.startIndex} variant="contained" type="button">
        Start Scan
      </Button>
    </div>
  );
}
