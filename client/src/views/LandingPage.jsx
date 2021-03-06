/* eslint-disable import/no-anonymous-default-export */
import * as React from 'react';
import { useState, useEffect } from 'react'
import axios from 'axios';
// import ToggleColorMode from '../components/Themes/ToggleDarkMode';
import bgImage from '../components/static/images/bgimage2.jpg';
import Header from '../components/LandingPage/Header';
import NavLinks from '../components/LandingPage/NavLinks';
import LandingBody from '../components/LandingPage/LandingBody';

export default ({loggedInUser, setLoggedInUser}) => {

  const [id, setId] = useState({id: ''})
  const myStyle = {
    backgroundImage:
      `url(${bgImage})`,
    height: '100vh',
    paddingTop: 0,
    fontSize: '50px',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  };
  console.log(loggedInUser)
  return (
    <div className='landingPage'
      style={myStyle}>
      {/* <ToggleColorMode currentPage="landingPage" /> */}
      <div className='d-flex align-items-center justify-content-between'>
        <div className='d-flex justify-content-start'>
          <Header currentPage='landingPage' id={id}/>
        </div>
        <div className='d-flex justify-content-end'>
          <div className='d-flex justify-content-evenly'>
            <NavLinks  loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser}/>
          </div>
        </div>
      </div>
      <LandingBody loggedInUser={loggedInUser}/>
    </div>
  );
};