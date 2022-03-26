/* eslint-disable import/no-anonymous-default-export */
import * as React from 'react';
import {
  BrowserRouter,
  Switch,
  Route
} from 'react-router-dom';
import Cookies from "js-cookie"
import jwt_decode from "jwt-decode"
// Recipe Imports

import Detail from './views/RecipeCRUD/Detail';

// Views Imports

import Main from './views/Main';

// Styling Imports
// import ToggleColorMode from './components/Themes/ToggleDarkMode';
import './App.css';
import './style.scss';
import {  FavoriteRecipeView } from './views/RecipeCRUD/FavoriteRecipeView';

export default () => {
  const [loggedInUser, setLoggedInUser] = React.useState(
    Cookies.get("user_id") ? jwt_decode(Cookies.get("user_id")) : "no user"
  )
  return (
    <div className="App">
      {/* <ToggleColorMode> */}
      <BrowserRouter>
        <Switch>
          {/* Dashboard Routes */}
          
          <Route exact path='/favorites'>
            <FavoriteRecipeView loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser}/>
          </Route>
          {/* Recipe Routes */}
          <Route exact path='/'>
            <Main  loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser}/>
          </Route>
          <Route exact path='/recipe/:id'>
            <Detail  loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser}/>
          </Route>
        </Switch>
      </BrowserRouter>
      {/* </ToggleColorMode> */}
    </div>
  );
};
