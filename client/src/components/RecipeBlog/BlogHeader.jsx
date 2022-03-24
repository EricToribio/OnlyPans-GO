/* eslint-disable import/no-anonymous-default-export */
import * as React from 'react';
import { Link } from 'react-router-dom';
import { Item } from '@mui-treasury/components/flex';
import Button from '@mui/material/Button';
// import { styled } from '@mui/material/styles';
// import TextField from '@mui/material/TextField';
// import IconButton from "@material-ui/core/IconButton";
// import InputAdornment from "@material-ui/core/InputAdornment";
// import SearchIcon from "@material-ui/icons/Search";
import MainCarouselContainer from './MainCarouselContainer';
import ViewOneCarousel from './ViewOneCarousel';
import BreakfastCarousel from './BreakfastCarousel';
import LunchCarousel from './LunchCarousel';
import DinnerCarousel from './DinnerCarousel';
import QuickiesCarousel from './QuickiesCarousel';
import FancyCarousel from './FancyCarousel';
import SweetsCarousel from './SweetsCarousel';
import axios from 'axios';

// const CssTextField = styled(TextField)({
//   '& label.Mui-focused': {
//     display: 'none',
//   },
//   '& .MuiInput-underline:after': {
//     borderBottomColor: '#000',
//   },
//   '& .MuiOutlinedInput-root': {
//     '& fieldset': {
//       borderColor: '#000',
//     },
//     '&:hover fieldset': {
//       borderColor: '#212121',
//     },
//     '&.Mui-focused fieldset': {
//       borderColor: '#000',
//     },
//   },
// });

export default ({sortTag}) => {
  const logo = require('../static/images/bloglogo.png');

  const linkStyle = {
    fontFamily: 'Open Sans',
    fontWeight: 'normal',
    color: '#000',
  }
  
  // const searchStyle = {
  //   width: '550px',
  //   height: '55px',
  //   marginTop: '-105px',
  //   bgcolor: '#fff',
  // }

  return (
    <div className='container-header mb-0'>
   
      <div className='carousel-header'>
            <MainCarouselContainer /> 
        <div>
          <div className="carousel mb-0 d-flex justify-content-center">
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                bgcolor: 'transparent',
                marginTop: '-360px',
                width: '400px',
                height: '85px',
                // width: '500px'
              }}
            >
              <Item sx={{
                boxSizing: 'content-box !important',
                border: '5px solid #000',
                bgcolor: '#fff',
              }}>
                <h2
                  style={{
                    height: 80,
                    width: 'auto',
                    padding: '10px 20px 18px',
                  }}
                  className='text-center overflow-hidden'
                > {sortTag}</h2>
              </Item>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

