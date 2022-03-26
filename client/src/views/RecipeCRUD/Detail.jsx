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
import jwt_decode from 'jwt-decode'
// import Header from '../../components/RecipeBlog/Header'
// import NavLinks from '../../components/RecipeBlog/NavLinks'
const Detail = ({ loggedInUser, setLoggedInUser }) => {
  const [recipe, setRecipe] = useState({})
  const { id } = useParams();
  const history = useHistory();
  const [user, setUser] = useState('');
  const [liked,setLiked] = useState(false)
  const [ingredients, setIngredients] = useState([])

  const [activeLink, setActiveLink] = useState(localStorage.getItem("active") ? localStorage.getItem("active") : localStorage.setItem('active', "Overview"))
  useEffect(() => {

    axios.get('https://www.themealdb.com/api/json/v1/1/lookup.php?i=' + id)
      .then(res => {
        console.log(res.data)
        setRecipe(res.data.meals[0])
        loggedInUser.likedRecipes.map((item) => {
          if(item.Recipe_id === res.data.meals[0].idMeal){
            setLiked(true)
          }
        })
      })
      .catch(err => console.error(err));
  }, [liked]);
console.log(ingredients)
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
        res.data.Recipe_id == id &&
        axios.post("http://localhost:8080/api/renew/jwt", loggedInUser)
        .then(res => {
          Cookies.set("user_id", res.data, { path: '/' })
          setLoggedInUser(jwt_decode(Cookies.get("user_id")))
          setLiked(true)
        }).catch(err=> console.log(err))

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
      axios.post("http://localhost:8080/api/renew/jwt", loggedInUser)
      .then(res => {
        Cookies.set("user_id", res.data, { path: '/' })
        setLoggedInUser(jwt_decode(Cookies.get("user_id")))
        setLiked(false)
      }).catch(err=> console.log(err))
    })
    .catch(err => console.log(err))
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
              loggedInUser != "no user" ?
              <IconButton aria-label="add to favorites"
              onClick={(e) => onFavoriteHandler(recipe.idMeal, recipe.strMealThumb, recipe.strMeal, recipe.strCategory)}
             >
              <FavoriteIcon /> 
            </IconButton> :
            <h4>Login to like recipes</h4>

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
                variant="body2" color="text.secondary">
                <h6>Instructions:</h6>
              </Typography>
              <Typography paragraph
                variant="body2" color="text.secondary">
                {recipe.strInstructions}
              </Typography>
              
                <Typography paragraph
                  variant="body2" color="text.secondary">
                  <h6>Ingredients:</h6>
                </Typography>
                  <Typography paragraph
                    variant="body2" color="text.secondary">
                    <ul>
                      {(recipe.strIngredient1 != ""  && recipe.strIngredient1 != null)&&
                      <li>{recipe.strMeasure1} {recipe.strIngredient1}</li>
                      }
                      {(recipe.strIngredient2 != ""&& recipe.strIngredient2 != null) &&
                      <li>{recipe.strMeasure2} {recipe.strIngredient2}</li>
                      }
                      {(recipe.strIngredient3 != ""&& recipe.strIngredient3 != null) &&
                      <li>{recipe.strMeasure3} {recipe.strIngredient3}</li>
                      }
                      {(recipe.strIngredient4 != "" && recipe.strIngredient4 != null)&&
                      <li>{recipe.strMeasure4} {recipe.strIngredient4}</li>
                      }
                      {(recipe.strIngredient5 != "" && recipe.strIngredient5 != null)&&
                      <li>{recipe.strMeasure5} {recipe.strIngredient5}</li>
                      }
                      {(recipe.strIngredient6 != ""&& recipe.strIngredient6 != null) &&
                      <li>{recipe.strMeasure6} {recipe.strIngredient6}</li>
                      }
                      {(recipe.strIngredient7 != ""&& recipe.strIngredient7 != null) &&
                      <li>{recipe.strMeasure7} {recipe.strIngredient7}</li>
                      }
                      {(recipe.strIngredient8 != ""&& recipe.strIngredient8 != null) &&
                      <li>{recipe.strMeasure8} {recipe.strIngredient8}</li>
                      }
                      {(recipe.strIngredient9 != ""&& recipe.strIngredient9 != null) &&
                      <li>{recipe.strMeasure9} {recipe.strIngredient9}</li>
                      }
                      {(recipe.strIngredient10 != "" && recipe.strIngredient9 != null)&&
                      <li>{recipe.strMeasure10} {recipe.strIngredient10}</li>
                      }
                      {(recipe.strIngredient11 != "" && recipe.strIngredient9 != null)&&
                      <li>{recipe.strMeasure11} {recipe.strIngredient11}</li>
                      }
                      {(recipe.strIngredient12 != ""&& recipe.strIngredient12 != null) &&
                      <li>{recipe.strMesure12} {recipe.strIngredient12}</li>
                      }
                      {(recipe.strIngredient13 != ""&& recipe.strIngredient13 != null) &&
                      <li>{recipe.strMesure13} {recipe.strIngredient13}</li>
                      }
                      {(recipe.strIngredient14 != ""&& recipe.strIngredient14 != null)  &&
                      <li>{recipe.strMesure14} {recipe.strIngredient14}</li>
                      }
                      {(recipe.strIngredient15 != "" && recipe.strIngredien15 != null)&&
                      <li>{recipe.strMesure15} {recipe.strIngredient15}</li>
                      }
                      {(recipe.strIngredient16 != "" && recipe.strIngredient16 != null)&&
                      <li>{recipe.strMesure16} {recipe.strIngredient16}</li>
                      }
                      {(recipe.strIngredient17 != ""&& recipe.strIngredient17 != null) &&
                      <li>{recipe.strMesure17} {recipe.strIngredient17}</li>
                      }
                      {(recipe.strIngredient18 != ""&& recipe.strIngredient18 != null) &&
                      <li>{recipe.strMesure18} {recipe.strIngredient18}</li>
                      }
                      {(recipe.strIngredient19 != "" && recipe.strIngredient19 != null)&&
                      <li>{recipe.strMesure19} {recipe.strIngredient19}</li>
                      }
                      {(recipe.strIngredient20 != "" && recipe.strIngredient20 != null)&&
                      <li>{recipe.strMesure20} {recipe.strIngredient20}</li>
                      }
                    </ul>
                  </Typography>
              {
                recipe.strYoutube != "" &&
                      <h3 className='text-center'>Watch the step by step video on <a href={recipe.strYoutube} target="_blank"> YouTube</a></h3>
              }
                      
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