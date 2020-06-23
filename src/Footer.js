import React from 'react'
import { AppBar, Toolbar, Fab, Snackbar } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import AddIcon from '@material-ui/icons/Add'
import MuiAlert from '@material-ui/lab/Alert';
import CreatePostDialog from './Components/CreatePostDialog'
import { useState } from 'react'

const useStyles = makeStyles(theme => ({
    appBar: {
        top: 'auto',
        bottom: 0,
      },
      fabButton: {
        position: 'absolute',
        zIndex: 1,
        top: -30,
        left: 0,
        right: 0,
        margin: '0 auto',
      },
      snackBar: {
        marginBottom : theme.spacing(10)
      }

}))

export default function Footer(props) {

  // For Input Dialog Box
    const [addPost, setaddPost] = useState(false)
    
     const handleClick = () => {
            setaddPost(!addPost)
            console.log('clicked')
    }

    const forceClose = () => {
        setaddPost(false)
    }

    // For confirmation message
    const [openConfirmation, setopenConfirmation] = useState(false)

    const isPosted = (confirmation) => {
      confirmation && setopenConfirmation(true)
    }

    const closeConfirmation = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setopenConfirmation(false);
    };

    const classes = useStyles()
    return (
        <div>
        <Snackbar open={openConfirmation} autoHideDuration={5000} onClose={closeConfirmation} className={classes.snackBar}>
                  <Alert onClose={closeConfirmation} severity="success">
                  Post saved!
                  </Alert>
              </Snackbar>

        <AppBar position="fixed" color="primary" className={classes.appBar} elevation={3} >
            <Toolbar>
            <Fab color="secondary" aria-label="add" className={classes.fabButton} onClick={handleClick}>
            <AddIcon />
          </Fab>
            </Toolbar>
        </AppBar>
        <CreatePostDialog dialogToggler={addPost} forceClose={forceClose} 
          isPosted={isPosted} api={props.api} setPosted={props.setPosted} posted={props.posted} username={props.username} />
        </div>
    )
}


function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}