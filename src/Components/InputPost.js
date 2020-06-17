import React from 'react'
import { Toolbar, TextField, Button } from '@material-ui/core'
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles(theme =>({
    buttonRoot: {
        margin: theme.spacing(2)
    },
    buttonLabel: {
        color: theme.palette.primary.main
    },


}))

export default function InputPost(props) {
    const classes = useStyles()
    return (
        <Toolbar disableGutters>
                <TextField
                    id="input-post"
                    style={{ margin: 8 }}
                    fullWidth
                    placeholder="Post something..."
                    color="secondary"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="filled" />
                
                    <Button 
                        classes = {{
                            root: classes.buttonRoot,
                            label: classes.buttonLabel
                        }}
                        variant="contained" color="secondary">Post</Button>
        </Toolbar>
    )
}
