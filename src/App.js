import React, { useState } from 'react';
import { Grid, Snackbar, LinearProgress } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import Loading from './Components/Loading'

const Feed = React.lazy(() => import('./Components/Feed'))
const Header = React.lazy(() => import('./Header'))
const LoginRegister = React.lazy(() => import('./Components/LoginRegister'))
const Footer = React.lazy(() => import('./Footer'))

const api = {
  online: "https://bright-snaps-cow.cyclic.cloud/",
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
    const [liked, setLiked] = useState(false)
    
    const regSuccess = <Alert severity="success" onClose={handleClose}>Registeration Successful!</Alert>
    const logSuccess = <Alert severity="success" onClose={handleClose}>Login Successful!</Alert>
    const logFail = <Alert severity="error" onClose={handleClose}>Wrong username or password!</Alert>


  return (
    <React.Suspense fallback={<Loading />}>
    <Grid container direction="column">
      <Grid item>
        <Header loggedIn={loggedIn} setloggedIn={setloggedIn}  />
      </Grid>

      <Grid item container>
        <Grid item xs={1} sm={2} md={3} />
        <Grid item xs={10} sm={8} md={6}>
            {
              loggedIn && <React.Suspense fallback={<Loading />}>
                            <Feed api= {api.online} posted={posted} setLiked={setLiked} liked={liked}
                                        currentName={user.name} currentUsername={user.username} /></React.Suspense>
            }
            <LoginRegister userOnLogin={userOnLogin} setuserOnLogin={setuserOnLogin} 
                          loggedIn={loggedIn} setloggedIn={setloggedIn}
                          setuser={setuser} api={api.online} user={user} 
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
        loggedIn && <Footer api={api.online} setPosted={setPosted} posted={posted} username={user.username} />
      }
      </Grid>
    </Grid>
    </React.Suspense>
  );
}

function Alert(props) {

  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default App;
