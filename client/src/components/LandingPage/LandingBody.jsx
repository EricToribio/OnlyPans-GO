/* eslint-disable import/no-anonymous-default-export */
import * as React from 'react';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { Row } from '@mui-treasury/components/flex';
import Button from '@mui/material/Button';
export default ({ loggedInUser }) => {
  const buttonStyle = {
    ':hover': {
      bgcolor: '#ef5350 !important',
      color: 'white',
    },
    color: '#fff',
    fontWeight: 'bold'
  }

  const welcomeStyle = {
    color: '#fff',
    fontFamily: 'Playfair Display',
    marginTop: 220,
    marginLeft: 50,
    width: '500px'
  }

  const metaStyle = {
    color: '#fff',
    fontFamily: 'Playfair Display',
    marginTop: 40,
    marginLeft: 65,
    width: '420px'
  }

  return (
    <div style={welcomeStyle} className='ps-5 ms-5'>
      <Typography variant="h2" component="div"
        style={welcomeStyle}
        sx={{
          fontSize: '4.5rem',
          fontWeight: 'bold'
        }}
      >
        Welcome to OnlyPans
        {
          loggedInUser != "no user" &&
          (" " + loggedInUser.firstName)
        }
      </Typography>
      <Typography variant="h4" component="div"
        style={metaStyle}
        sx={{
          fontSize: '1.5rem',
        }}
      >
        Access our collection of recipes made by our community of bloggers
      </Typography>
      {
        loggedInUser != "no user" &&
        <ul className='navlinks pt-3 px-5'>
            <li className='list-unstyled pe-5'>
              <Button component={Link} to={`/dashboard/${loggedInUser.user_id}`}
                sx={buttonStyle} 
              ><Typography variant="h4" component="div"
              sx={{
                fontSize: '1.5rem',
              }}
            >Home</Typography></Button>
            </li>
          
          <li className='list-unstyled pe-5'>
            <Button component={Link} to='/recipes'
              sx={buttonStyle}
            ><Typography variant="h4" component="div"
            sx={{
              fontSize: '1.5rem',
            }}
          >Blog</Typography></Button>
          </li>
        </ul>
      }
    </div>
  );
};