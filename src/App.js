import React, { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import Header from "./Header"
import LoginRegister from "./Components/LoginRegister"
import Feed from "./Components/Feed"
import Footer from "./Footer"


const api = {
  online: "https://youpost-api.herokuapp.com/",
  offline: "http://localhost:5000/"
}

function App() {
  
  const [loggedIn, setloggedIn] = useState(false)

  const [user, setuser] = useState({
                                    name:" ",
                                    email:" ",
                                    password:" ",
                                    username: " "                                    
                                  })

  const [userOnLogin, setuserOnLogin] = useState(true)
  

  return (
    <Grid container direction="column">
      <Grid item>
        <Header />
      </Grid>

      <Grid item container>
        <Grid item xs={1} sm={2} md={3} />
        <Grid item xs={10} sm={8} md={6}>
            {
              loggedIn && <Feed api= {api} />
            }
            <LoginRegister userOnLogin={userOnLogin} setuserOnLogin={setuserOnLogin} loggedIn={loggedIn} setloggedIn={setloggedIn}
                          setuser={setuser} />
        </Grid>
        <Grid item xs={1} sm={2} md={3} />
      </Grid>

      <Grid item>
      {
        loggedIn && <Footer api={api} />
      }
      </Grid>
    </Grid>
  );
}

export default App;
