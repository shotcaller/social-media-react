import React from 'react'
import { Typography, Button, Card, CardContent, CardActions, Box, Divider } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(3),
        backgroundColor: theme.palette.primary.main

    },
    title: {
        fontSize: 30,
        marginTop: theme.spacing(2)
    },
    icons: {
        fontSize: 50,
    
    },
    divider: {
        backgroundColor: theme.palette.secondary.main,
        height: 2,
        width: 300
        
    }
}))

export default function LoginRegister(props) {

    if(props.loggedIn) {
        return null
    }



    return (
        <div>
            {
                props.userOnLogin?
                    <Login setloggedIn={props.setloggedIn} setuserOnLogin={props.setuserOnLogin} />:
                    <Register setuserOnLogin={props.setuserOnLogin} />
                    }
        </div>
    )
}



 function Login(props) {

    const classes = useStyles()
    return (
        <div>
            {/* <Typography variant="h1" color="textPrimary">Login Page</Typography>
            <Button varaint="contained" color="secondary" onClick={() => props.setloggedIn(true)}>Log In</Button>
            <Typography variant="caption" color="textSecondary">Don't have an account?</Typography>
            <Button variant="contained" color="primary" onClick={() => props.setuserOnLogin(false)} >Register</Button>
        
             */}
        <Card className={classes.root} variant="outlined">
            <CardContent>
             <Box display="flex" alignItems="center" flexDirection="column">
            <AccountCircleIcon className={classes.icons}/>
            <Typography className={classes.title} color="textSecondary" variant="h1" gutterBottom align="center">
            Login
            </Typography>
             <Divider variant="middle" className={classes.divider}  />
            </Box>
        </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
        </div>
    )
}

 function Register(props) {
    return (
        <div>
            <Typography variant="h1" color="textPrimary">Register Page</Typography>
            <Typography variant="caption" color="textSecondary">Already have an account?</Typography>
            <Button varaint="contained" color="secondary" onClick={() => props.setuserOnLogin(true)}>Log In</Button>
            <Button variant="contained" color="primary" >Register</Button>
        </div>
    )
}


