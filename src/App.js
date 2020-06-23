import React, { useState } from 'react';
import { Grid, Snackbar, LinearProgress } from '@material-ui/core';
import Header from "./Header"
import LoginRegister from "./Components/LoginRegister"
import Footer from "./Footer"
import MuiAlert from '@material-ui/lab/Alert';

const Feed = React.lazy(() => import('./Components/Feed'))

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

    const [posted, setPosted] = useState(false)
    
    const regSuccess = <Alert severity="success" onClose={handleClose}>Registeration Successful!</Alert>
    const logSuccess = <Alert severity="success" onClose={handleClose}>Login Successful!</Alert>
    const logFail = <Alert severity="error" onClose={handleClose}>Wrong username or password!</Alert>


  return (
    <Grid container direction="column">
      <Grid item>
        <Header loggedIn={loggedIn} setloggedIn={setloggedIn}  />
      </Grid>

      <Grid item container>
        <Grid item xs={1} sm={2} md={3} />
        <Grid item xs={10} sm={8} md={6}>
            {
              loggedIn && <React.Suspense fallback={<LinearProgress color="primary"/>}>
                            <Feed api= {api.offline} posted={posted} name={user.name}  /></React.Suspense>
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
        loggedIn && <Footer api={api.offline} setPosted={setPosted} posted={posted} username={user.username} />
      }
      </Grid>
    </Grid>
  );
}

function Alert(props) {

  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default App;
