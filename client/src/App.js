/* eslint-disable import/no-anonymous-default-export */
import * as React from 'react';
import {
  BrowserRouter,
  Switch,
  Route
} from 'react-router-dom';
import Cookies from "js-cookie"
// Dashboard Imports
import ManagePostsTab from './components/Dashboard/ManagePostsTab';
import UsersLiked from './components/Dashboard/UsersLiked';


// Recipe Imports
import CategoryViewAll from './views/RecipeCRUD/CategoryViewAll';
import Create from './views/RecipeCRUD/Create';
import Detail from './views/RecipeCRUD/Detail';
import Update from './views/RecipeCRUD/Update';

// Views Imports
import LandingPage from './views/LandingPage';
import Main from './views/Main';
import Dashboard from './views/Dashboard';
import ViewAllUsers from './views/UserCRUD/ViewAllUsers';
import DetailUser from './views/UserCRUD/DetailUser';
import EditUser from './views/UserCRUD/EditUser';

// Styling Imports
// import ToggleColorMode from './components/Themes/ToggleDarkMode';
import './App.css';
import './style.scss';
import {  FavoriteRecipeView } from './views/RecipeCRUD/FavoriteRecipeView';

export default () => {
  const [loggedInUser, setLoggedInUser] = React.useState(
    Cookies.get("user_id" ? Cookies.get("user_id") : "no user")
  )
  return (
    <div className="App">
      {/* <ToggleColorMode> */}
      <BrowserRouter>
        <Switch>
          {/* Login & Registration Routes */}
          <Route exact path='/'>
            <LandingPage loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser} />
          </Route>
          {/* Dashboard Routes */}
          <Route exact path='/dashboard/:id'>
            <Dashboard loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser}/>
          </Route>
          <Route exact path='/dashboard/edit/:id'>
            <ManagePostsTab loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser}/>
          </Route>
          <Route exact path='/dashboard/users/:id'>
            <UsersLiked loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser}/>
          </Route>
          <Route exact path='/dashboard/favorites/:id'>
        
            <FavoriteRecipeView loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser}/>
          </Route>
          {/* User Routes */}
          <Route exact path='/users'>
            <ViewAllUsers />
          </Route>
          <Route exact path='/user/:id'>
            <DetailUser />
          </Route>
          <Route exact path='/user/edit/:id'>
            <EditUser />
          </Route>
          {/* Recipe Routes */}
          <Route exact path='/recipes'>
            <Main />
          </Route>
          <Route exact path='/:category/recipes'>
            <CategoryViewAll />
          </Route>
          <Route exact path='/recipe/new'>
            <Create />
          </Route>
          <Route exact path='/recipe/:id'>
            <Detail />
          </Route>
          <Route exact path='/recipe/edit/:id'>
            <Update />
          </Route>
        </Switch>
      </BrowserRouter>
      {/* </ToggleColorMode> */}
    </div>
  );
};
