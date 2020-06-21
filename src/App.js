import React, { useState } from 'react';
import { Grid, Snackbar } from '@material-ui/core';
import Header from "./Header"
import LoginRegister from "./Components/LoginRegister"
import Feed from "./Components/Feed"
import Footer from "./Footer"
import MuiAlert from '@material-ui/lab/Alert';

const api = {
  online: "https://youpost-api.herokuapp.com/",
  offline: "http://localhost:5000"
}





function App() {
  
  const [loggedIn, setloggedIn] = useState(false)

  const [open, setOpen] = useState(false)
    const handleClose = () => {
        setOpen(false)
    }

  const [user, setuser] = useState({
                                    id: "",
                                    name:" ",
                                    email:" ",
                                    username: " "                                    
                                  })

  const [userOnLogin, setuserOnLogin] = useState(true)
                                
    const [msgStatus, setmsgStatus] = useState(0)
    
    const regSuccess = <Alert severity="success" onClose={handleClose}>Registeration Successful!</Alert>
    const logSuccess = <Alert severity="success" onClose={handleClose}>Login Successful!</Alert>
    const logFail = <Alert severity="error" onClose={handleClose}>Wrong username or password!</Alert>


  return (
    <Grid container direction="column">
      <Grid item>
        <Header />
      </Grid>

      <Grid item container>
        <Grid item xs={1} sm={2} md={3} />
        <Grid item xs={10} sm={8} md={6}>
            {
              loggedIn && <Feed api= {api.offline} />
            }
            <LoginRegister userOnLogin={userOnLogin} setuserOnLogin={setuserOnLogin} 
                          loggedIn={loggedIn} setloggedIn={setloggedIn}
                          setuser={setuser} api={api.offline} user={user} 
                          setmsgStatus={setmsgStatus} open={open} 
                          setOpen={setOpen} handleClose={handleClose} />
             <Snackbar anchorOrigin={{ vertical:'top', horizontal: 'center' }} 
                            open={open} autoHideDuration={5000} onClose={handleClose} >
                            { msgStatus===1?regSuccess:msgStatus===2?logSuccess:msgStatus===3?logFail:null}
        </Snackbar>

        </Grid>
        <Grid item xs={1} sm={2} md={3} />
      </Grid>

      <Grid item>
      {
        loggedIn && <Footer api={api.offline} />
      }
      </Grid>
    </Grid>
  );
}

function Alert(props) {

  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default App;
