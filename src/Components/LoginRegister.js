import React, { useState, useEffect } from 'react'
import { Typography, Button, Card, CardContent, CardActions, Box, Divider, TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import MuiAlert from '@material-ui/lab/Alert';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { useForm } from 'react-hook-form' 
import axios from 'axios'


const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(2.5),
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
        width: 300,
        marginBottom: theme.spacing(2)
        
    },
    textfield: {
        marginTop: theme.spacing(3),
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#c5c6c7',
              borderSize: '3px'
            }
        }

    },
    submitButton: {
        marginTop: theme.spacing(3)
    },
    registerOptions: {
        marginLeft: theme.spacing(3)
    },
    alert: {
        marginBottom: theme.spacing(1)
    }
    
}))


function Alert(props) {
    const classes = useStyles()
    return <MuiAlert elevation={6} variant="filled" {...props} className={classes.alert} />;
  }

export default function LoginRegister(props) {

    if(props.loggedIn) {
        return null
    }



    return (
        <div>
            {
                props.userOnLogin?
                    <Login setloggedIn={props.setloggedIn} setuserOnLogin={props.setuserOnLogin} />:
                    <Register setuserOnLogin={props.setuserOnLogin} api={props.api} />
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
             <form>
                <Box display="flex" alignItems="center" flexDirection="column">
                 <TextField type="text" className={classes.textfield} size="normal" variant="outlined" color="secondary" label="Username"/>
                 <TextField type="password" className={classes.textfield} size="normal" variant="outlined" color="secondary" label="Password"/>
                 <Button className={classes.submitButton} type="submit" fullWidth variant="contained" color="secondary">Login</Button>
                 </Box>
             </form>
            </Box>
        </CardContent>
      <CardActions>
        <Box className={classes.registerOptions}>
        <Typography variant="caption" color="textSecondary">Don't have an account?</Typography>
        <Button className={classes.registerOptions} size="small" onClick={() => props.setuserOnLogin(false)}>Register</Button>
        </Box>
      </CardActions>
    </Card>
        </div>
    )
}

 function Register(props) {
     const classes = useStyles()

     const [regUser, setregUser] = useState({
         name: '',
         email: '',
         username: '',
         password: ''
     })

     const [checkUsername, setcheckUsername] = useState("")

     useEffect(() =>  {
         
            axios.post(`${props.api.offline}users/checkuser`, { username: checkUsername})
                .then(res => {
                    console.log(res.data)
                    setregUser({...regUser,"username": checkUsername})
                })
                .catch(err => console.log(err))

        },[checkUsername])

     const { register, handleSubmit, errors } = useForm()


     const onSubmit = () => {
        console.log(regUser)
        props.setuserOnLogin(true)
     }

     const updateRegUser = (name,e) => {
        setregUser({...regUser, [name] : e.target.value})
     
     }
    return (
        <div>
            <Card className={classes.root} variant="outlined">
                <CardContent>
                    <Box display="flex" alignItems="center" flexDirection="column">
                        <PersonAddIcon className={classes.icons} />
                        <Typography className={classes.title} color="textSecondary" variant="h1" gutterBottom align="center">
                            Register
                        </Typography>   
                         <Divider variant="middle" className={classes.divider}  />
                         <form onSubmit={handleSubmit(onSubmit)}>
                        <Box display="flex"  alignItems="center" flexDirection="column">
                        { errors.name && <Alert severity="error">Name is required!</Alert> }
                        { errors.username && <Alert severity="error">Username is required!</Alert> }
                        { errors.email && <Alert severity="error">Email is required!</Alert> }
                        { errors.password && <Alert severity="error">Password must be minimum 8 characters and maximum 20 characters!</Alert>}
                         <TextField type="text"
                                    className={classes.textfield} 
                                    size="normal" variant="outlined" 
                                    color="secondary" 
                                    label="Name"
                                    name="name"
                                    inputRef={register({required: true})}
                                    onChange={(e) => updateRegUser("name",e)}
                                    //defaultValue={regUser.name}
                         />
                         <TextField type="email" 
                                    className={classes.textfield} 
                                    size="normal" 
                                    variant="outlined" 
                                    color="secondary" 
                                    label="Email"
                                    name="email"
                                    inputRef={register({required: true})}
                                    onChange={(e) => updateRegUser("email",e)}
                                    //defaultValue={regUser.email}
                         />
                         <TextField type="text"  
                                    className={classes.textfield} 
                                    size="normal" 
                                    variant="outlined" 
                                    color="secondary" 
                                    label="Username"
                                    inputRef={register({required: true})}
                                    onChange={(e) => setcheckUsername(e.target.value)}
                                    name="username"
                                    //defaultValue={regUser.username}
                         />
                         <TextField type="password" 
                                    className={classes.textfield} 
                                    size="normal" 
                                    variant="outlined" 
                                    color="secondary" 
                                    label="Password"
                                    name="password"
                                    inputRef={register({required: true,  minLength: 8, maxLength: 20})}
                                    onChange={(e) => updateRegUser("password",e)}

                         />
                      
                         <Button className={classes.submitButton} type="submit" fullWidth variant="contained" color="secondary">Register</Button>
                         </Box>
                         </form>

                    </Box>
                </CardContent>
                <CardActions>
        <Box className={classes.registerOptions}>
        <Typography variant="caption" color="textSecondary">Already have an account?</Typography>
        <Button className={classes.registerOptions} size="small" onClick={() => props.setuserOnLogin(true)}>Login</Button>
        </Box>
      </CardActions>

            </Card>
        </div>
    )
}


