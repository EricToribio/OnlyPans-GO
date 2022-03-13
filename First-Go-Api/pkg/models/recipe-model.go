package models

import (
	_ "github.com/go-sql-driver/mysql"
	"github.com/jinzhu/gorm"
)

type Recipe struct {
	gorm.Model
	Name         string `gorm: "" json:"name"`
	Category     string `json:"category"`
	Cuisine      string `json:"cuisine"`
	Description  string `json:"description"`
	Ingredients  string `json:"ingredients"`
	Instructions string `json:"instructions"`
	Image        string `json:"image"`
	User_id      uint   `gorm: "foreignKey: user_id "json:"user_id"`
}

func (r *Recipe) NewRecipe() *Recipe {
	db.NewRecord(r)
	db.Create(r)
	return r
}

func GetAllRecipes() []Recipe {
	var Recipes []Recipe
	//db.Raw("SELECT name, category, cuisine FROM recipes").Scan(&Recipes)
	db.Find(&Recipes)
	return Recipes
}
