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
  const [sortTag, setSortTag] = useState('Beef');
  
  return (
    <div className='container'>
      <div className='d-flex justify-content-between pt-4' >
        <div className='d-flex justify-content-start'>
          <Header currentPage='dashboard'/>
        </div>
          <div className='d-flex justify-content-evenly'>
            <NavLinks activeLink={activeLink} loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser}/>
          </div>
        </div>
      <BlogHeader sortTag={sortTag}  user={user} pageComponent='viewallrecipes' />
      <RecipeList setActiveLink={setActiveLink} sortTag={sortTag} setSortTag={setSortTag} user={loggedInUser} />
    </div>
  )
};