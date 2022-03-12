package models

import (
	_ "github.com/go-sql-driver/mysql"
)

type LikedRecipe struct {
	Recipe_id uint `gorm: "foreignKey: recipe_id "`
	User_id   uint `gorm: "foreignKey: user_id "`
}