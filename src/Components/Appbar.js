import React from 'react'
import { AppBar, Toolbar, Typography, IconButton, Tooltip } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const useStyles = makeStyles( theme =>({
    root: {
        flexGrow: 1
    },
    appBar: {
        backgroundColor: theme.palette.primary
    },
    title: {
        flexGrow: 1,
        marginLeft: theme.spacing(2)
    }
    
}));

export default function Appbar(props) {
    const classes = useStyles()
    return (
        <div className={classes.root}>
        <AppBar position="static" className={classes.appBar}>
            <Toolbar>    
                <Typography className={classes.title} variant="h3" color="textPrimary">NovoPost</Typography>
                { props.loggedIn && <Tooltip title="Log Out" arrow>
                     <IconButton color="secondary" onClick={() => props.setloggedIn(false)}>
                        <ExitToAppIcon />
                    </IconButton>
                    </Tooltip> }
                    
            </Toolbar>
        </AppBar>
        </div>
    )
}
