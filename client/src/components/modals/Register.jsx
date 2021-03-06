import * as React from 'react';
import { useState } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom';
import { createTheme } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import jwt_decode from "jwt-decode"
import Cookies from "js-cookie"
const Copyright = (props) => {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href='https://mui.com/'>
        OnlyPans
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default ({ handleClose, setLoggedInUser,changeOpen}) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState();
  const [profileAvatar, setAvatar] = useState('https://wallpapercave.com/uwp/uwp430668.png')

  const logo = require('../static/images/onlypansegglogo.png')

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:8080/api/new/user', {
      email: email,
      firstName: firstName,
      lastName: lastName,
      password: password,
      profileAvatar: profileAvatar
    })
      .then(res => {
        console.log("response from registering", res);
        if (res.data.error) {
          setErrors(res.data.error)
        } else {
          console.log("reg")
          Cookies.set("user_id", res.data, { path:  '/' })
          setLoggedInUser(jwt_decode(Cookies.get("user_id")))
          handleClose()
        }
      })
      .catch(err => console.log(err))
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
          Sign Up
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} >
              {
                (errors && errors.message) &&
                  <Stack sx={{ width: '100%', mt: 2 }} spacing={2}>
                    <Alert severity="error">{errors.message}</Alert>
                  </Stack> 
              }
              <TextField
                onChange={(e) => setFirstName(e.target.value)}
                required
                fullWidth
                id="firstName"
                label="First Name"
                name="firstName"
                autoComplete="given-name"
              />
              { (errors && errors.firstName) &&  <Stack sx={{ width: '100%', mt: 2 }} spacing={2}>
                    <Alert severity="error">{errors.firstName}</Alert>
                  </Stack>}
            </Grid>
            <Grid item xs={12}>
            <TextField
                onChange={(e) => setLastName(e.target.value)}
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
              />
              {(errors && errors.lastName) && <Stack sx={{ width: '100%', mt: 2 }} spacing={2}>
                    <Alert severity="error">{errors.lastName}</Alert>
                  </Stack>}
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={(e) => setEmail(e.target.value)}
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
              {(errors && errors.email) && <Stack sx={{ width: '100%', mt: 2 }} spacing={2}>
                    <Alert severity="error">{errors.email}</Alert>
                  </Stack>}
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={(e) => setPassword(e.target.value)}
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
              />
              {(errors && errors.password) && <Stack sx={{ width: '100%', mt: 2 }} spacing={2}>
                    <Alert severity="error">{errors.password}</Alert>
                  </Stack> }
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                id="confirmPassword"
                autoComplete="new-password"
              />
              {/* {errors.confirm_password? <p className="text-danger">{errors.confirm_password}</p>: ""} */}
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Create Account
          </Button>
          <Grid container justifyContent="center">
            <Grid item sx={{ textAlign: 'center' }}>
              Already have an Account?
              <Button onClick={(e) => changeOpen("login")} variant="body2" >
                Log In
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