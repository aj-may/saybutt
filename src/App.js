import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Prank from './Prank';
import Grid from '@material-ui/core/Grid';
import './App.css';
import pranks from './pranks.json';

class App extends Component {
  render() {
    return (
      <div>
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
      </div>
    );
  }
}

export default App;
