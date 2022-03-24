/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import FavoriteRecipes from '../../components/Dashboard/FavoriteRecipes';
import SideNav from '../../components/Dashboard/SideNav';
import ToggleColorMode from '../../components/Themes/ToggleDarkMode';
import { ThemeProvider } from '@material-ui/styles';
import { createTheme } from '@material-ui/core';
import Cookies from 'js-cookie';
import Header from '../../components/LandingPage/Header';
import NavLinks from '../../components/LandingPage/NavLinks';
const baseTheme = createTheme();

export const FavoriteRecipeView = ({loggedInUser,setLoggedInUser}) => {
  const [user, setUser] = useState(false);
  const [logout, setLogout] = useState();
  const history = useHistory();

  useEffect(async () => {
    !Cookies.get("user_id") &&
        history.push('/');
    
  }, []);

  return (
    <div>
      <div className='d-flex align-items-center justify-content-between'>
        <div className='d-flex justify-content-start'>
          <Header currentPage='dashboard' id={loggedInUser.id}/>
        </div>
        <div className='d-flex justify-content-end'>
          <div className='d-flex justify-content-evenly'>
            <NavLinks  currentPage='dashboard'  loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser}/>
          </div>
        </div>
        </div>
      {/* <div className='position-fixed'> */}
        {/* <SideNav setLogout={setLogout}
          avatar={user.profileAvatar}
          username={user.username}
          id={user._id} />
      </div> */}
      <div className='dashboard-body'>
        <ToggleColorMode currentPage="dashboard">
          <ThemeProvider theme={baseTheme}>
            <div className="App">
              {
                user &&
                <FavoriteRecipes favoriteRecipes={user.favoriteRecipe} />
              }
            </div>
          </ThemeProvider>
        </ToggleColorMode>
      </div>
    </div>
  )
};
