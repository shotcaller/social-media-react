import React from 'react'
import { AppBar, Toolbar, Fab } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import AddIcon from '@material-ui/icons/Add'
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


}))

export default function Footer() {

    const [addPost, setaddPost] = useState(false)

     const handleClick = () => {
            setaddPost(!addPost)
            console.log('clicked')
    }

    const forceClose = () => {
        setaddPost(false)
    }

    const classes = useStyles()
    return (
        <div>
        <AppBar position="fixed" color="primary" className={classes.appBar} elevation={3}>
            <Toolbar>
            <Fab color="secondary" aria-label="add" className={classes.fabButton} onClick={handleClick}>
            <AddIcon />
          </Fab>
            </Toolbar>
        </AppBar>
        <CreatePostDialog dialogToggler={addPost} forceClose={forceClose} />
        </div>
    )
}
