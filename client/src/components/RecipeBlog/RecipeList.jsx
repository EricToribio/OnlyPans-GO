/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable array-callback-return */
import * as React from 'react';
import { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import DeleteButton from '../Buttons/DeleteButton';
import { Button } from '@mui/material';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import StickyFooter from './StickyFooter';
// import ShareIcon from '@mui/icons-material/Share';
// import MoreVertIcon from '@mui/icons-material/MoreVert';

export default ({ user, sortTag, setSortTag }) => {
  const [recipes, setRecipes] = useState([]);
  const [sortBy, setSortBy] = useState('Beef');
  const [links, setLinks] = useState([])

  useEffect(() => {
    axios.get('https://www.themealdb.com/api/json/v1/1/categories.php')
      .then(res => {
        console.log(res.data)
        setLinks(res.data.categories)})
        .catch(err => console.log(err))
  }, []);
  useEffect(() => {
    axios.get('https://www.themealdb.com/api/json/v1/1/filter.php?c='+sortBy)
    .then(res => {
      console.log(res.data)
      setRecipes(res.data.meals)
    })
    .catch(err => console.log(err))
  },[sortBy])

  const removeFromDom = recipeId => {
    setRecipes(recipes.filter(recipe => recipe._id !== recipeId))
  }

  const onFavoriteHandler = (id, img, name) => {
    let newFavorite = { id, img, name }
    let favorites = [...user.favoriteRecipe, newFavorite]
    axios.put(`http://localhost:8000/api/user/update/${user._id}`, {
      favoriteRecipe: favorites
    })
      .then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      });
  };
  

  const linkBase = {
    fontFamily: 'Open Sans',
    fontWeight: 'normal',
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
  
  return (
    <div style={{ 
      marginTop : '-175px'
    }}>
      
      <div className=''>
        <ul className='categories-list 
        d-flex align-items-center justify-content-center gap-4 px-0'>
         {
           links.map((item, i) => {
            let linkStyle =``
            sortBy === item.strCategory ? (linkStyle += "text-danger"):
              (linkStyle += "text-dark text-decoration-none }");
             return(
            <li>
            <Button component={Link} to='#'
              sx={linkBase}
              className={linkStyle}
              onClick={(e) => {
                setSortTag(item.strCategory)
                setSortBy(item.strCategory)
              }}
            >
              {item.strCategory}
            </Button>
          </li>
           )})
         }
         
          
        </ul>
      </div>
      <div className='
      d-flex align-items-center
      justify-content-center mt-5 gap-5 flex-wrap'>
        {
          recipes.map((recipe, index) => {
            
            return (
              <div className="recipe-card">
                <Card key={index}
                  sx={{
                    maxWidth: 345,
                  }}>
                    <Link to={`/recipe/${recipe.idMeal}`} className='text-decoration-none'>
                 
                        <h4 className='text-center'>{recipe.strMeal}</h4>
                  
                    <CardMedia
                      component="img"
                      height="194"
                      image={recipe.strMealThumb}
                      alt={recipe.strMeal}
                    />
                  <CardContent>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        display: '-webkit-box',
                        overflow: 'hidden',
                        WebkitBoxOrient: 'vertical',
                        WebkitLineClamp: 3,
                      }}>
                      See Full Recipe
                    </Typography>
                  </CardContent>
                  <CardActions disableSpacing>
                     <IconButton aria-label="share">
                    </IconButton> 
                   </CardActions>
                        </Link>
                </Card>
              </div>
            )
          })
        }
      </div> 
      <div className='mt-5'>
        <StickyFooter />
      </div> 
    </div>
  )
}