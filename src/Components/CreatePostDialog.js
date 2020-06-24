import React, { useState, useEffect } from 'react'
import { Dialog, DialogTitle, DialogActions, DialogContent, Button, TextField, Box, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import MuiAlert from '@material-ui/lab/Alert';


const useStyles = makeStyles(theme => ({
    paper: {
        backgroundColor: '#1f2833',
         
    },
    textfield: {
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: '#c5c6c7',
          borderSize: '3px'
    }
  }
},
  counter: {
    textAlign: "right"
  },
  postDialog: {
    width: 300
  }
}))

export default function CreatePostDialog(props) {
    let toggler = props.dialogToggler

    // Dialog open-close hook
    const [open, setOpen] = useState(false)
    useEffect(() => {
        setOpen(toggler)
        //console.log(toggler)
    },[toggler])

    //Handling post form 
    const { register, handleSubmit ,errors } = useForm()
    
    // New post hook
    const [newPost, setnewPost] = useState({
                                              username: props.username,
                                              post: ''
                                            })


    const handleClose = () => {
        setOpen(false);
        props.forceClose()
      };

      const handlePostClose = () => {

        axios.post(props.api, { username: newPost.username, message: newPost.post})
                    .then(res => {
                      //console.log(res)
                      props.isPosted(res)
                      props.setPosted(!props.posted)
                    })
                    .catch(err => console.log(err))
        setnewPost({ username: '', post: ''})
        setOpen(false);
        props.forceClose()
      }

    

      const classes = useStyles()
    return (
        <Box>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" classes={{
                paper: classes.paper,
            }}>
        <DialogTitle id="form-dialog-title">Add Post</DialogTitle>
        <form onSubmit={handleSubmit(() => handlePostClose())}>
        <DialogContent>
        { errors.post && errors.post.type === 'validate' && <Alert severity="error">Must be less than 250 characters!</Alert>}
          <TextField
            className={classes.textfield}
            variant="outlined"
            name="post"
            inputRef={register({ validate: () => newPost.post.length <= 250})}
            color="secondary"
            margin="dense"
            id="post"
            label="Enter post..."
            type="text"
            multiline
            fullWidth
            onChange={e => setnewPost({ ...newPost, post: e.target.value})}
            value= {newPost.post}
          />
         <Typography className={classes.counter} variant="caption" color="textPrimary">{newPost.post.length}/250</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button type="submit"  color="secondary">
            Post
          </Button>
        </DialogActions>
        </form>
      </Dialog>
        </Box>
    )
}


function Alert(props) {
  const classes = useStyles()
  return <MuiAlert elevation={6} variant="filled" {...props} className={classes.alert} />;
}