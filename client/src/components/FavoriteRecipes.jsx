/* eslint-disable import/no-anonymous-default-export */
import * as React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
// import CardActions from '@mui/material/CardActions';
// import IconButton from '@mui/material/IconButton';
// import FavoriteIcon from '@mui/icons-material/Favorite';

export default ({ favoriteRecipes }) => {

  const linkStyle = {
    fontFamily: 'Open Sans',
    fontWeight: 'normal',
    color: 'text.primary',
    textTransform: 'capitalize',
    p: 0,
    ':hover': {
      color: '#ffc107'
    },
    ':active': {
      fontWeight: 'bold'
    }
  }
  return (
    <div className='fave-recipes d-flex align-items-center
              justify-content-center flex-wrap gap-5'>
      {
        favoriteRecipes.map((recipe, i) => {
          return (
            <div className='grid'>
              <div className="recipe-card2">
                <Card key={i}
                  component={Paper}
                  sx={{
                    maxWidth: 345,
                    border: '1px solid #e0e0e0',
                  }}>
                  <CardHeader
                    title={
                      <Button component={Link} to={`/recipe/${recipe.Recipe_id}`}
                        sx={linkStyle}
                        style={{
                          fontWeight: 'bold',
                          lineHeight: 'normal',
                          marginBottom: '5px',
                          display: '-webkit-box',
                          overflow: 'hidden',
                          WebkitBoxOrient: 'vertical',
                          WebkitLineClamp: 2,
                        }}
                        className="text-center"
                        >
                        {recipe.Name}
                      </Button>
                    }
                  />
                  <Link to={`/recipe/${recipe.Recipe_id}`}>
                    <CardMedia
                      component="img"
                      height="194"
                      image={recipe.image}
                      alt={recipe.Name}
                    />
                  </Link>
                 
                  {/* <CardActions disableSpacing>
                    <Button
                      onClick={(e) => onFavoriteHandler(recipe._id, recipe.image, recipe.name)}
                    >
                      <IconButton aria-label="add to favorites">
                        <FavoriteIcon />
                      </IconButton>
                    </Button>
                    <IconButton aria-label="share">
                      <ShareIcon />
                    </IconButton>
                  </CardActions> */}
                </Card>
              </div>
            </div>
          )
        })
      }
    </div>
  );
};