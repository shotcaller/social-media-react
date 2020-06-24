import React from 'react'
import { Toolbar, Typography } from '@material-ui/core'



export default function InputPost(props) {
   // const classes = useStyles()
    return (
        <Toolbar disableGutters>
                {/* <TextField
                    id="input-post"
                    style={{ margin: 8 }}
                    fullWidth
                    disabled
                    placeholder="Post something..."
                    color="secondary"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    defaultValue={`Welcome User!`}
                    variant="filled" /> */}
                    <Typography variant="h5" align="center" color="textSecondary" display="block">Welcome {props.currentName.split(" ")[0]}!</Typography>
                
                    {/* <Button 
                        classes = {{
                            root: classes.buttonRoot,
                            label: classes.buttonLabel
                        }}
                        variant="contained" color="secondary">Log Out</Button> */}
        </Toolbar>
    )
}
