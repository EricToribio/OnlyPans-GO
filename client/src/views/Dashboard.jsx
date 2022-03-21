/* eslint-disable import/no-anonymous-default-export */
import * as React from 'react';
import { useState, useEffect } from "react"
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import ToggleColorMode from '../components/Themes/ToggleDarkMode';
import SideNav from '../components/Dashboard/SideNav';
import DashboardBody from '../components/Dashboard/DashboardBody';
import { createTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";

const baseTheme = createTheme();

export default ({loggedInUser, setLoggedInUser}) => {
  const history = useHistory();

  useEffect(() => {
        loggedInUser == "no user" &&
        history.push('/') 
  }, [loggedInUser]);
  

  return (
    <div className=''>
      <div className='position-fixed'>
        <SideNav setLogout={setLoggedInUser}
          avatar={loggedInUser.profileAvatar}
          username={loggedInUser.username}
          id={loggedInUser._id} />
      </div>
      <div className='dashboard-body'>
        <ToggleColorMode currentPage="dashboard">
          <ThemeProvider theme={baseTheme}>
            <div className="App">
              <DashboardBody user={loggedInUser._id} />
            </div>
          </ThemeProvider>
        </ToggleColorMode>
      </div>
    </div>
  );
};
