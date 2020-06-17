import React from 'react'
import { Typography, Button } from '@material-ui/core'


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
    return (
        <div>
            <Typography variant="h1" color="textPrimary">Login Page</Typography>
            <Button varaint="contained" color="secondary" onClick={() => props.setloggedIn(true)}>Log In</Button>
            <Typography variant="caption" color="textSecondary">Don't have an account?</Typography>
            <Button variant="contained" color="primary" onClick={() => props.setuserOnLogin(false)} >Register</Button>
   
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


