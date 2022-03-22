/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import RecipeList from '../components/RecipeBlog/RecipeList';
import BlogHeader from '../components/RecipeBlog/BlogHeader';
import Cookies from 'js-cookie';

export default () => {
  const [user, setUser] = useState("");
  const history = useHistory();
  const [logout, setLogout] = useState('');

  useEffect(() => {
    !Cookies.get("user_id") &&
        history.push('/')
  }, []);

  return (
    <div className='container'>
      <BlogHeader setLogout={setLogout} user={user} pageComponent='viewallrecipes' />
      <RecipeList user={user} />
    </div>
  )
};