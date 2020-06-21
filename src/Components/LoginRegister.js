import React, { useState } from 'react'
import { Typography, Button, Card, CardContent, CardActions, Box, Divider, TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { useForm } from 'react-hook-form' 
import axios from 'axios'
import MuiAlert from '@material-ui/lab/Alert';


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
                    <Login setloggedIn={props.setloggedIn} setuserOnLogin={props.setuserOnLogin} setOpen={props.setOpen} 
                        api={props.api} setuser={props.setuser} user={props.user} setmsgStatus={props.setmsgStatus} />:
                    <Register setuserOnLogin={props.setuserOnLogin} api={props.api} setOpen ={props.setOpen} setmsgStatus={props.setmsgStatus} />
                    }
                   
        </div>
    )
}



 function Login(props) {

    const [ userLogin, setuserLogin ] = useState({
                                            username: "",
                                            password: ""
                                        })

     const { register, handleSubmit, errors } = useForm() 

     const onSubmit = async () => {
        try {
         let res = await axios.post(`${props.api}/users/login`, { username : userLogin.username, password: userLogin.password })
         //console.log(res)

         if(res.status === 200) {
             console.log("Login successful")
             props.setuser({...props.user,
                            "id": res.data._id,
                            "name": res.data.name,
                            "email": res.data.email,
                            "username": res.data.username})
                    
            props.setmsgStatus(2)
            props.setOpen(true)
            props.setloggedIn(true)


         }
        } catch (err) {
            props.setmsgStatus(3)
            props.setOpen(true)
            console.log('Login Failed', err)
        }

     }

     const updateLoginUser = (name,e) => {
        setuserLogin({...userLogin, [name]: e.target.value})
     }

    const classes = useStyles()
    return (
        <div>
        <Card className={classes.root} variant="outlined">
            <CardContent>
             <Box display="flex" alignItems="center" flexDirection="column">
            <AccountCircleIcon className={classes.icons}/>
            <Typography className={classes.title} color="textSecondary" variant="h1" gutterBottom align="center">
            Login
            </Typography>
             <Divider variant="middle" className={classes.divider}  />
             <form onSubmit={handleSubmit(() => onSubmit())}>
             { errors.username && <Alert severity="error">{errors.username.message}</Alert>}
             { errors.password && <Alert severity="error">{errors.password.message}</Alert>}
                <Box display="flex" alignItems="center" flexDirection="column">
                 <TextField type="text" 
                            className={classes.textfield} 
                            size="medium" 
                            variant="outlined" 
                            color="secondary" 
                            label="Username"
                            name="username"
                            onChange={(e) => updateLoginUser("username",e)}
                            inputRef={register({ required: "Username is required!" })}
                            />
                 <TextField type="password" 
                            className={classes.textfield} 
                            size="medium" 
                            variant="outlined" 
                            color="secondary" 
                            label="Password"
                            name="password"
                            onChange={(e) => updateLoginUser("password",e)}
                            inputRef={register({ required: "Password is required!"})}    
                            />
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


     const { register, handleSubmit, errors } = useForm()

     const checkUsername = async (username) => {
         try {
         let res = await axios.post(`${props.api}/users/checkuser`, { username: username})
         return !res.data
        }
        catch(err) {
            console.log(err)
        }
     }

     const onSubmit = async () => {
        try{
         await axios.post(`${props.api}/users/register`, { user: regUser})
         props.setmsgStatus(1)
        props.setOpen(true)
        props.setuserOnLogin(true)
        }
        catch(err) {
            console.log(err)
        }
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
                         <form onSubmit={handleSubmit(() => onSubmit())}>
                        <Box display="flex"  alignItems="center" flexDirection="column">
                        { errors.name && <Alert severity="error">{errors.name.message}</Alert> }
                        { errors.username && errors.username.type ==="validate" &&  <Alert severity="error">Username already exists!</Alert>}
                        { errors.email && <Alert severity="error">{errors.email.message}</Alert> }
                        { errors.password &&  <Alert severity="error">{errors.password.message}</Alert>}
                         <TextField type="text"
                                    className={classes.textfield} 
                                    size="medium" variant="outlined" 
                                    color="secondary" 
                                    label="Name"
                                    name="name"
                                    inputRef={register({required: "Name is required!"})}
                                    onChange={(e) => updateRegUser("name",e)}
                                    //defaultValue={regUser.name}
                         />
                         <TextField type="email" 
                                    className={classes.textfield} 
                                    size="medium" 
                                    variant="outlined" 
                                    color="secondary" 
                                    label="Email"
                                    name="email"
                                    inputRef={register({required: "Email is required!"})}
                                    onChange={(e) => updateRegUser("email",e)}
                                    //defaultValue={regUser.email}
                         />
                         <TextField type="text"  
                                    className={classes.textfield} 
                                    size="medium" 
                                    variant="outlined" 
                                    color="secondary" 
                                    label="Username"
                                    defaultValue={regUser.username}
                                    onChange={(e) => updateRegUser("username",e)}
                                    inputRef={register({required: "Username is required!",
                                     validate: checkUsername })}
                                    name="username"
                                   
                         />
                         <TextField type="password" 
                                    className={classes.textfield} 
                                    size="medium" 
                                    variant="outlined" 
                                    color="secondary" 
                                    label="Password"
                                    name="password"
                                    inputRef={register({required: "Password is required!", 
                                    minLength: { value: 8, message: "Password should be minimum 8 characters long."}})}
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


