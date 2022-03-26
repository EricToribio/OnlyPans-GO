/* eslint-disable import/no-anonymous-default-export */
import * as React from 'react';
import { Link } from 'react-router-dom';

import { Row } from '@mui-treasury/components/flex';
import Button from '@mui/material/Button';
import LoginModal from '../modals/LoginModal'
import RegistrationModal from '../modals/RegistrationModal'
import EditUserModal from '../modals/EditUserModal'
import Cookies from 'js-cookie';
import { useHistory } from 'react-router-dom';

export default ({ loggedInUser, setLoggedInUser,currentPage}) => {
const [loginOpen, setLoginOpen] = React.useState(false)
const [registerOpen, setRegisterOpen] = React.useState(false)
const [activeLink, setActiveLink] = React.useState(localStorage.getItem("active") ? localStorage.getItem("active") : localStorage.setItem('active', "Overview"))
const history = useHistory()
const links =[
  {link: "/recipes", name : 'All Recipes'},
  {link : `/dashboard/favorites/${loggedInUser.user_id}`, name : "Favorite Recipes"}
]
const open = (page) => {
  
  
  if (page === "login"){
    setLoginOpen(true)
    setRegisterOpen(false)
    page = ""
  }
  else if (page === "register"){
    setLoginOpen(false)
    setRegisterOpen(true) 
    page = ''
  }
  // page === "login"  ? (setLoginOpen(true), setRegisterOpen(false)) :
  // (setLoginOpen(false), setRegisterOpen(true))
}
const dashboardStyle ={
  ':hover': {
    bgcolor: '#ef5350 !important',
    color: '#000000',
  },
  color: '#000000',
  fontWeight: 'bold'
}

const buttonStyle = {
  ':hover': {
    bgcolor: '#ef5350 !important',
    color: 'white',
  },
  color: '#fff',
  fontWeight: 'bold'
}
  const active = {
    color: '#ffc107',
    textDecoration: 'none'
}
const inactive = {
  color : "#0000000", 
  textDecoration: 'none'
}


  const logout = () => {
    Cookies.remove("user_id")
    setLoggedInUser("no user")
    history.push("/")
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
            
              <LoginModal setLoggedInUser={setLoggedInUser} changeOpen={open} loginOpen={loginOpen}/>
              <RegistrationModal setLoggedInUser={setLoggedInUser} changeOpen={open} registerOpen={registerOpen}/>
            </li>
          </ul>
          :
      
          <ul className='navlinks d-flex pt-3 px-3'>
            <li className='list-unstyled pe-5'>
          {
            currentPage === 'dashboard' ?
            
            <div className="d-flex gap-3">
            {links.map((item,i) => {
              console.log(activeLink)
               let linkStyle =``
               activeLink === item.name ? (linkStyle += "text-danger text-decoration-none"):
                 (linkStyle += "text-dark text-decoration-none }");
              return(
                <li  >
                  <Link to={item.link} className={linkStyle} onClick={(e)=>
                    setActiveLink(localStorage.setItem('active', item.name))
                   
                    }>{item.name}</Link>
                </li>
              )
              })}
            </div>:
<Button onClick={logout}
              sx={buttonStyle}
              >Log out</Button>

          }
            </li>
          </ul>
        }
      </Row>
    </div>
  );
};

