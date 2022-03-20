/* eslint-disable import/no-anonymous-default-export */
import * as React from 'react';
import { Link } from 'react-router-dom';
import { Row } from '@mui-treasury/components/flex';
import Button from '@mui/material/Button';
import LoginModal from '../modals/LoginModal'
import axios from 'axios';
import Cookies from 'js-cookie';

export default ({ loggedInUser, setLoggedInUser}) => {

  const buttonStyle = {
    ':hover': {
      bgcolor: '#ef5350 !important',
      color: 'white',
    },
    color: '#fff',
    fontWeight: 'bold'
  }

  const logout = () => {
    Cookies.remove("user_id")
    setLoggedInUser("no user")
  }

  return (
    <div className='mx-5'>
      <Row
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-evenly',
        }}
      >
        {loggedInUser === "no user" ?
          <ul className='navlinks d-flex pt-3 px-3'>
            <li className='list-unstyled ps-2'>
              <LoginModal setLoggedInUser={setLoggedInUser} >Log In</LoginModal>
            </li>
          </ul>
          :
          <ul className='navlinks d-flex pt-3 px-3'>
            <li className='list-unstyled pe-5'>
              <Button component={Link} to={`/dashboard/${loggedInUser.user_id}`}
                sx={buttonStyle}
              >Home</Button>
            </li>
            <li className='list-unstyled pe-5'>
              <Button component={Link} to='/recipes'
                sx={buttonStyle}
              >Blog</Button>
            </li>
            <li className='list-unstyled pe-5'>
              <Button onClick={logout}
                sx={buttonStyle}
              >Log out</Button>
            </li>
          </ul>
        }
      </Row>
    </div>
  );
};

