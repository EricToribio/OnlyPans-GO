package models

import (
	_ "github.com/go-sql-driver/mysql"
	"github.com/jinzhu/gorm"
)

type Recipe struct {
	gorm.Model
	Name         string
	Category     string
	Cuisine      string
	Description  string
	Ingredients  string
	Instructions string
	Image        string
	User_id      uint
	User         User
}
