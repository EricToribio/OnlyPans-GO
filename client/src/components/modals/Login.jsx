/* eslint-disable import/no-anonymous-default-export */
import * as React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import { createTheme } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import useStyles from './Styles';
import RegistrationModal from './RegistrationModal';
import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode'

const Copyright = (props) => {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" to="#">
        OnlyPans
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// eslint-disable-next-line no-unused-vars
const theme = createTheme();

export default ({ handleClose, setLoggedInUser, changeOpen}) => {
  const [errors, setErrors] = useState("");
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });
  const classes = useStyles();

  const logo = require('../static/images/onlypansegglogo.png')

  const loginChangeHandler = (e) => {
    setLoginInfo({
      ...loginInfo,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8080/api/login', loginInfo)
      .then(res => {
        if (res.data?.error) {
          setErrors(res.data.error)
        } else {
          Cookies.set("user_id", res.data, { path: '/' })
          setLoggedInUser(jwt_decode(Cookies.get("user_id")))
          handleClose()
        }
      })
      .catch(err => console.log(err));
  };

  const googleSuccess = async (res) => {
    console.log(res.profileObj)
    axios.post('http://localhost:8080/api/google/login', res.profileObj)
      .then(res => {
        Cookies.set("user_id", res.data, { path: '/' })
        setLoggedInUser(jwt_decode(Cookies.get("user_id")))
        handleClose()
      })
      .catch(err => console.log(err));
  };

  const googleFailure = (res) => {
    console.log("Google sign in not working!", res);
  };

  return (
    // <ThemeProvider theme={theme}>
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar variant="square"
          src={logo} alt="logo"
          sx={{
            height: 42,
            width: 53,
            mb: 3,
            pl: 1
          }}
        >
        </Avatar>
        <Typography component="h1" variant="h5">
          Log In
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={loginChangeHandler}
          />
          
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={loginChangeHandler}
          />
            {
            errors ?
              <Stack sx={{ width: '100%', my: 2 }} spacing={2}>
                <Alert severity="error">{errors}</Alert>
              </Stack> : ""
          }
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <GoogleLogin
            clientId='28144132869-865k00rjanquba9oel14bbtt75rn8tv5.apps.googleusercontent.com'
            render={(renderProps) => (
              <Button className={classes.googleButton}
                color="primary"
                fullWidth
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                // startIcon={<Icon />}
                variant="contained"
                sx={{ mb: 2 }}
              >Google Sign In </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy='single_host_origin'
          />
          <Grid container
            sx={{
              display: 'flex',
              justifyContent: 'center'
            }}
          >
            <Grid item sx={{ textAlign: 'center' }}>
            <Button
            type="button"
            fullWidth
            onClick={(e) => changeOpen(e, "register")}
            sx={{ mt: 3, mb: 2, }}
          >
              Don't have an Account?
          </Button>
              
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ pt: 3, mb: 4 }} />
    </Container>
    // </ThemeProvider>
  );
};