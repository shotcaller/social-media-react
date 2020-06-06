import React, { useState, useEffect } from 'react'
import { Dialog, DialogTitle, DialogActions, DialogContent, Button, TextField, Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
    paper: {
        backgroundColor: '#1f2833',
         
    },

}))

export default function CreatePostDialog(props) {
    let toggler = props.dialogToggler
    const [open, setOpen] = useState(false)
    useEffect(() => {
        setOpen(toggler)
        console.log(toggler)
    },[toggler])
    

    const handleClose = () => {
        setOpen(false);
        props.forceClose()
      };

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
            
          />

          <TextField
            margin="dense"
            id="post"
            label="Enter post..."
            type="text"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="secondary">
            Post
          </Button>
        </DialogActions>
      </Dialog>
        </Box>
    )
}
