import React from 'react'
import { AppBar, Toolbar, Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles( theme =>({
    appBar: {
        backgroundColor: theme.palette.primary
    }
    
}));

export default function Appbar() {
    const classes = useStyles()
    return (
        <div>
        <AppBar position="static" className={classes.appBar}>
            <Toolbar>
                <Grid container>
                    <Grid item xs={1} />
                    <Grid item >
                        <Typography variant="h3" color="textPrimary">YouPost</Typography>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
        </div>
    )
}
