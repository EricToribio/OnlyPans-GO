package models

import (
	"fmt"
	_ "github.com/go-sql-driver/mysql"
	"github.com/jinzhu/gorm"
)

type Req struct {
	Recipe_id string `json:"recipe_id`
	User_id   int    `json:"user_id"`
}
type LikedRecipe struct {
	gorm.Model
	Recipe_id string `json:"recipe_id`
	Name      string `gorm: "" json:"name"`
	Category  string `json:"category"`
	Image     string `json:"image"`
	User_id   uint   `gorm: "foreignKey: user_id "json:"user_id"`
}

func (r *LikedRecipe) NewRecipe() *LikedRecipe {
	db.NewRecord(r)
	db.Create(r)
	return r
}

func GetAllUsersLikedRecipes(id uint) []LikedRecipe {
	var Recipes []LikedRecipe
	db.Find(&Recipes, "user_id = ?", id)
	return Recipes
}

func DeleteLikedRecipe(recipe *Req) bool {
	fmt.Println(recipe)
	var result struct {
		Found bool
	}

	db.Raw("DELETE  FROM liked_recipes WHERE recipe_id = ? AND user_id = ? ", recipe.Recipe_id, recipe.User_id).Scan(&result)
	fmt.Println(result)
	return true
}
