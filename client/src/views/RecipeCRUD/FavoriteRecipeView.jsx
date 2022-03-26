/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from '@mui/material';
import FavoriteRecipes from '../../components/Dashboard/FavoriteRecipes';
import BlogHeader from '../../components/RecipeBlog/BlogHeader'
import { createTheme } from '@material-ui/core';
import Cookies from 'js-cookie';
import Header from '../../components/LandingPage/Header';
import NavLinks from '../../components/LandingPage/NavLinks';
const baseTheme = createTheme();

export const FavoriteRecipeView = ({loggedInUser,setLoggedInUser}) => {
  const history = useHistory();

  useEffect(async () => {
    !Cookies.get("user_id") &&
        history.push('/');
  }, []);
  const logout = () => {
    Cookies.remove("user_id")
    setLoggedInUser("no user")
  }
  const dashboardStyle = {
    ':hover': {
      bgcolor: '#ef5350 !important',
      color: '#000000',
    },
    color: '#000000',
    fontWeight: 'bold'
  }
  return (
    <div className='container'>
      <div className='d-flex align-items-center justify-content-between'>
        <div className='d-flex justify-content-start'>
          <Header currentPage='dashboard' id={loggedInUser.id}/>
        </div>
        <div className='d-flex justify-content-end'>
          <div className='d-flex justify-content-evenly'>
            <NavLinks  currentPage='dashboard'  loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser}/>
          </div>
        </div>
        <div className=''>
          <Button onClick={logout}
            sx={dashboardStyle}
          >Log out</Button>
        </div>
        </div>
      <BlogHeader sortTag="Favorite Recipes"
        pageComponent='viewonerecipe' />
      <div className='dashboard-body'>
            <div className="App">
                <FavoriteRecipes favoriteRecipes={loggedInUser.likedRecipes} />
            </div>

      </div>
    </div>
  )
};
