package models

import (
	_ "github.com/go-sql-driver/mysql"
)

type LikedUser struct {
	User_id uint `gorm:"foreignKey: user_id "`
	Liked   uint `gorm: "foreignKey: user_id"`
}
