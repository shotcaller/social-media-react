import React from 'react'
import { Grid, useScrollTrigger, Zoom, Fab  } from '@material-ui/core'
import InputPost from './Components/InputPost'
import Post from './Components/Post'
import { makeStyles } from '@material-ui/core/styles'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';



export default function Feed(props) {
    return (
        <Grid container direction="column" >
           <Grid item id="back-to-top-anchor">
            <InputPost  />
        </Grid>

        <Grid item>
            <Post />
            <Post />
            <Post />
            <Post />
            <Post />
            <Post />
            <Post />
            <Post />
            <Post />

        </Grid>
        <ScrollTop {...props}>
        <Fab color="secondary" size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
        </ScrollTop>
            </Grid>
    )
}


const useStyles = makeStyles((theme) => ({
    root: {
      position: 'fixed',
      bottom: theme.spacing(10),
      right: theme.spacing(4),
    },
  }));

function ScrollTop(props) {
  const { children, window } = props;
  const classes = useStyles();

  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector('#back-to-top-anchor');

    if (anchor) {
      anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <Zoom in={trigger}>
      <div onClick={handleClick} role="presentation" className={classes.root}>
        {children}
      </div>
    </Zoom>
  );
}

