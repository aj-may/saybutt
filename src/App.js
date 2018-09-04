import React, { Fragment } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import ReactGA from 'react-ga';

import Prank from './Prank';
import pranks from './pranks.json';
import './App.css';

ReactGA.initialize('UA-125158442-1');
ReactGA.pageview(window.location.pathname + window.location.search);

const App = () => (
  <Fragment>
    <AppBar>
      <Toolbar>
        <Typography variant="title" color="inherit">
          &gt; Say Butt
        </Typography>
      </Toolbar>
    </AppBar>

    <Grid container spacing={24}>
      {pranks.map((prank, i) => (<Grid item xs={12} md={6} xl={4} key={i}>
        <Prank name={prank.name} description={prank.description} />
      </Grid>))}
    </Grid>
  </Fragment>);

export default App;
