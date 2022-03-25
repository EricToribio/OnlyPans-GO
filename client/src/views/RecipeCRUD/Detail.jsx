/* eslint-disable no-unused-vars */
import * as React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useHistory } from "react-router-dom";
import { Link } from 'react-router-dom';
import BlogHeader from '../../components/RecipeBlog/BlogHeader';
import { Button } from '@mui/material';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import StickyFooter from '../../components/RecipeBlog/StickyFooter';
import Cookies from 'js-cookie';
import Header from '../../components/LandingPage/Header'
import NavLinks from '../../components/LandingPage/NavLinks'
// import Header from '../../components/RecipeBlog/Header'
// import NavLinks from '../../components/RecipeBlog/NavLinks'
const Detail = ({ loggedInUser, setLoggedInUser }) => {
  const [recipe, setRecipe] = useState({})
  const { id } = useParams();
  const history = useHistory();
  const [user, setUser] = useState('');
  const [liked,setLiked] = useState(false)

  const [activeLink, setActiveLink] = useState(localStorage.getItem("active") ? localStorage.getItem("active") : localStorage.setItem('active', "Overview"))
  useEffect(() => {
    !Cookies.get("user_id") &&
      history.push('/')
    axios.get('https://www.themealdb.com/api/json/v1/1/lookup.php?i=' + id)
      .then(res => {
        console.log(res.data)
        setRecipe(res.data.meals[0])
      })
      .catch(err => console.error(err));
     loggedInUser.likedRecipes.map((item) => {
       console.log(item.Recipe_id, recipe.idMeal)
       if(item.Recipe_id === recipe.idMeal){
         setLiked(true)
       }
     })
  }, [liked]);

  const onFavoriteHandler = (id, img, name, category) => {

    axios.post(`http://localhost:8080/api/new/recipe`, {
      recipe_id: id,
      name: name,
      image: img,
      category: category,
      user_id: loggedInUser.user_id
    } )
      .then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      });
  };
  const onFavoriteDelete = (id) => {
    axios.post('http://localhost:8080/api/delete/recipe',{
      recipe_id : id,
      user_id: loggedInUser.user_id
    })
    .then(res => {
      setLiked(false)
    })
    .catch(err => console.log(err))
  }

  const linkStyle = {
    fontFamily: 'Open Sans',
    fontWeight: 'normal',
    color: '#000',
    textTransform: 'capitalize',
    p: 0,
    ':hover': {
      color: '#212121'
    },
    ':active': {
      fontWeight: 'bold'
    }
  }

  const avatarSize = {
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    objectFit: 'cover',
    height: 60,
  }

  
    
  const logout = () => {
    Cookies.remove("user_id")
    setLoggedInUser("no user")
  }
  const dashboardStyle = {
    ':hover': {
      bgcolor: '#ef5350 !important',
      color: '#000000',
    },
    color: '#000000',
    fontWeight: 'bold'
  }
  return (
    <div className='container'>
      <div className='d-flex align-items-center justify-content-between'>
        <div className='d-flex justify-content-start'>
          <Header currentPage='dashboard' id={loggedInUser.user_id} />
        </div>
        {/* <div className='d-flex justify-content-end'> */}
        <div className='d-flex justify-content-evenly'>
          <NavLinks activeLink={activeLink} currentPage='dashboard' loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser} />
        </div>
        <div className=''>
          <Button onClick={logout}
            sx={dashboardStyle}
          >Log out</Button>
        </div>
        {/* </div> */}
      </div>
      <BlogHeader sortTag={recipe.strMeal}
        pageComponent='viewonerecipe' />
      <div className='one-recipe mx-auto 
      d-flex align-items-center
      justify-content-center mt-5 gap-5 flex-wrap'>
        <Card sx={{
          maxWidth: 900,
          marginTop: '-200px',
          padding: '50px 75px',

        }}>
          <div className="recipe-header 
            d-flex align-items-center justify-content-between ">
            <h4>Add To Favorites</h4>
            <CardActions disableSpacing>
              {
                liked   ?
                <IconButton aria-label="add to favorites"
                onClick={(e) => onFavoriteDelete(recipe.idMeal,)}
               sx={{color : 'red'}}>
                <FavoriteIcon />
              </IconButton>:
              <IconButton aria-label="add to favorites"
              onClick={(e) => onFavoriteHandler(recipe.idMeal, recipe.strThumb, recipe.strMeal, recipe.strCategory)}
             >
              <FavoriteIcon />
            </IconButton>
                }
                
          
           
            </CardActions>
          </div>
          <div className="recipe-body">
            <CardMedia
              component="img"
              height="400"
              image={recipe.strMealThumb}
              alt={recipe.strMeal}
            />
            <CardContent>
              <Typography paragraph
                variant="body2"
                color="text.secondary"
                sx={{ marginBottom: 1 }}>
                <strong>Category: </strong>
                {recipe.strCategory}
              </Typography>
              <Typography paragraph
                variant="body2"
                color="text.secondary"
                sx={{ marginBottom: 1 }}>
                <strong>Cuisine:</strong> {recipe.cuisine}
              </Typography>
              <Typography paragraph
                variant="body2"
                color="text.secondary"
                sx={{ marginBottom: 4 }}>
                <strong>Allergy Warning:</strong> {recipe.allergies}
              </Typography>
              <Typography paragraph
                variant="body2" color="text.secondary">
                <h6>Ingredients:</h6>
              </Typography>
              <Typography paragraph
                variant="body2" color="text.secondary">
                {recipe.ingredients}
              </Typography>
              <Typography paragraph
                variant="body2" color="text.secondary">
                <h6>Instructions:</h6>
              </Typography>
              <Typography paragraph
                variant="body2" color="text.secondary">
                {recipe.instructions}
              </Typography>
            </CardContent>
          </div>
        </Card>
      </div>
      <div className='mt-5'>
        <StickyFooter />
      </div>
    </div>
  )
}

export default Detail;