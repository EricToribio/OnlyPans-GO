/* eslint-disable import/no-anonymous-default-export */
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import RecipeList from '../components/RecipeBlog/RecipeList';
import BlogHeader from '../components/RecipeBlog/BlogHeader';
import Cookies from 'js-cookie';
import Header from '../components/LandingPage/Header'
import NavLinks from '../components/LandingPage/NavLinks'
import { Button } from '@mui/material';
export default ({loggedInUser, setLoggedInUser}) => {
  const [user, setUser] = useState("");
  const history = useHistory();
  const [activeLink, setActiveLink] = useState(localStorage.getItem("active") ? localStorage.getItem("active") : localStorage.setItem('active', "Overview"))
  const [sortTag, setSortTag] = useState('All POSTS');
  useEffect(() => {
    !Cookies.get("user_id") &&
        history.push('/')
  }, []);
  const logout = () => {
    Cookies.remove("user_id")
    setLoggedInUser("no user")
  }
  const dashboardStyle ={
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
          <Header currentPage='dashboard' id={loggedInUser.user_id}/>
        </div>
          <div className='d-flex justify-content-evenly'>
            <NavLinks activeLink={activeLink} currentPage='dashboard'  loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser}/>
          </div>
          <div className=''>
          <Button onClick={logout}
                sx={dashboardStyle}
                >Log out</Button>
          </div>
        </div>
      <BlogHeader sortTag={sortTag}  user={user} pageComponent='viewallrecipes' />
      <RecipeList sortTag={sortTag} setSortTag={setSortTag} user={user} />
    </div>
  )
};