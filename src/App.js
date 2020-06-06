import React from 'react';
import { Grid } from '@material-ui/core';
import Header from "./Header"
import Feed from "./Feed"
import Footer from "./Footer"


function App() {
  return (
    <Grid container direction="column">
      <Grid item>
        <Header />
      </Grid>

      <Grid item container>
        <Grid item xs={1} sm={2} md={3} />
        <Grid item xs={10} sm={8} md={6}>
          <Feed />
        </Grid>
        <Grid item xs={1} sm={2} md={3} />
      </Grid>

      <Grid item>
        <Footer />
      </Grid>
    </Grid>
  );
}

export default App;
