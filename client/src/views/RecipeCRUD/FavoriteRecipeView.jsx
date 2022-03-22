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

const baseTheme = createTheme();

export const FavoriteRecipeView = () => {
  const [user, setUser] = useState(false);
  const [logout, setLogout] = useState();
  const history = useHistory();

  useEffect(async () => {
    !Cookies.get("user_id") &&
        history.push('/');
    
  }, []);

  return (
    <div>
      <div className='position-fixed'>
        <SideNav setLogout={setLogout}
          avatar={user.profileAvatar}
          username={user.username}
          id={user._id} />
      </div>
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
