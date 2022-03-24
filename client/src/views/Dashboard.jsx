/* eslint-disable import/no-anonymous-default-export */
import * as React from 'react';
import { useState, useEffect } from "react"
import { useHistory } from 'react-router-dom';
import Header from '../components/LandingPage/Header'
import NavLinks from '../components/LandingPage/NavLinks'
import ToggleColorMode from '../components/Themes/ToggleDarkMode';
import SideNav from '../components/Dashboard/SideNav';
import DashboardBody from '../components/Dashboard/DashboardBody';
import { createTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";

const baseTheme = createTheme();

export default ({loggedInUser, setLoggedInUser}) => {
  const history = useHistory();
  const [activeLink, setActiveLink] = useState(localStorage.getItem("active") ? localStorage.getItem("active") : localStorage.setItem('active', "Overview"))
  useEffect(() => {
        loggedInUser == "no user" &&
        history.push('/') 
  }, [loggedInUser]);
  
  return (
    <div className=''>
      <div className='d-flex align-items-center justify-content-between'>
        <div className='d-flex justify-content-start'>
          <Header currentPage='dashboard' id={loggedInUser.id}/>
        </div>
        <div className='d-flex justify-content-end'>
          <div className='d-flex justify-content-evenly'>
            <NavLinks activeLink={activeLink} currentPage='dashboard'  loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser}/>
          </div>
        </div>
        </div>
      
    
      <div className='dashboard-body'>
        {/* <ToggleColorMode currentPage="dashboard">
          <ThemeProvider theme={baseTheme}> */}
            <div className="App">
              <DashboardBody user={loggedInUser._id} />
            </div>
          {/* </ThemeProvider>
        </ToggleColorMode> */}
      </div>
    </div>
  );
};
