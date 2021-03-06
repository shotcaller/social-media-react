import React ,{ useEffect, useState } from 'react'
import { Grid, useScrollTrigger, Zoom, Fab  } from '@material-ui/core'
import InputPost from './InputPost'
import Post from './Post'
import { makeStyles } from '@material-ui/core/styles'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import axios from 'axios'


export default function Feed(props) {

  
  const [posts, setPosts] = useState([])
   
  useEffect(() => {
     axios.get(props.api)
                  .then(res => {
                    setPosts(res.data)
                    //console.log(res.data)
                  
                  })
                  .catch(err =>{
                    console.log(err)
                  })  
                
  },[props.posted,props.api,props.liked])
  
  const displayPosts =  (
      <div>
     { posts.map((post, index) => {
      return <li key={post._id} 
                 style={{ listStyleType: "none"}}>
                 <Post  id={post._id} username={post.username} content={post.message} currentUsername={props.currentUsername}
                        createdAt={post.createdAt} currentName={props.currentName} liked={props.liked}
                        api={props.api} setLiked={props.setLiked} like={post.like} />
                 </li>
    })
  }
  </div>
  )

  const classes = useStyles()

  return (
        <Grid container direction="column" >
           <Grid item id="back-to-top-anchor">
             <InputPost currentName={props.currentName} />
        </Grid>

        <Grid item className={classes.gridPadding}>
              {displayPosts}
                      </Grid>
        <ScrollTop {...props}>
        <Fab color="secondary" size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
        </ScrollTop>
            </Grid>
    )
}


//Below part is for the Scoll-to-top button 

const useStyles = makeStyles((theme) => ({
    root: {
      position: 'fixed',
      bottom: theme.spacing(10),
      right: theme.spacing(4),
    },
    gridPadding: {
      paddingBottom: theme.spacing(10)
    }
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

