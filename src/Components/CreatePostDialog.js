import React, { useState, useEffect } from 'react'
import { Dialog, DialogTitle, DialogActions, DialogContent, Button, TextField, Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import axios from 'axios'

const useStyles = makeStyles(theme => ({
    paper: {
        backgroundColor: '#1f2833',
         
    },

}))

export default function CreatePostDialog(props) {
    let toggler = props.dialogToggler

    // Dialog open-close hook
    const [open, setOpen] = useState(false)
    useEffect(() => {
        setOpen(toggler)
        console.log(toggler)
    },[toggler])
    
    // New post hook
    const [newPost, setnewPost] = useState({
                                              name: '',
                                              post: ''
                                            })


    const handleClose = () => {
        setOpen(false);
        props.forceClose()
      };

      const handlePostClose = () => {

        axios.post(props.api.offline, { name: newPost.name, message: newPost.post})
                    .then(res => {
                      console.log(res)
                      props.isPosted(res)
                    })
                    .catch(err => console.log(err))
        setnewPost({ name: '', post: ''})
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
        <DialogContent>
        <TextField
            margin="dense"
            id="name"
            label="Enter name..."
            type="text"
            onChange= {e => setnewPost({ ...newPost, name: e.target.value})}
            value= {newPost.name}
          />

          <TextField
            margin="dense"
            id="post"
            label="Enter post..."
            type="text"
            fullWidth
            onChange={e => setnewPost({ ...newPost, post: e.target.value})}
            value= {newPost.post}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handlePostClose} color="secondary">
            Post
          </Button>
        </DialogActions>
      </Dialog>
        </Box>
    )
}
