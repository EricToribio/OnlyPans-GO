package models

import (
	"fmt"
	"time"

	jwt "github.com/dgrijalva/jwt-go"
	"github.com/erictoribio/go-api/pkg/config"
	_ "github.com/go-sql-driver/mysql"
	"github.com/jinzhu/gorm"
	"golang.org/x/crypto/bcrypt"
)

var db *gorm.DB
var mySigningKey = []byte("mysupersecretphrase")

type User struct {
	gorm.Model
	FirstName string `gorm:"not null" json:"firstName"`
	LastName  string `json:"lastName"`
	Email     string `"json:"email"`
	Password  string `"json:"password"`
}

func init() {
	config.Connect()
	db = config.GetDB()
	db.AutoMigrate(&User{})
}

func (u *User) CreateUser() *User {
	db.NewRecord(u)
	db.Create(u)
	return u
}

func GetAllUsers() []User {
	var Users []User
	db.Find(&Users)
	return Users
}

func FindUserByEmail(Email string) bool {

	var result struct {
		Found bool
	}

	db.Raw("SELECT EXISTS(SELECT 1 FROM users WHERE email = ?) AS found",
		Email).Scan(&result)
	if result.Found {
		fmt.Println("found")
	} else {
		fmt.Println("not found")
	}
	return result.Found
}

func HashPassword(password string) string {
	bytes, _ := bcrypt.GenerateFromPassword([]byte(password), 14)
	return string(bytes)
}

func CheckPasswordHash(password, hash string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
	return err == nil
}

func GenerateJwt(user *User) (string, error) {
	token := jwt.New(jwt.SigningMethodHS256)

	claims := token.Claims.(jwt.MapClaims)
	claims["firstname"] = user.FirstName
	claims["lastName"] = user.LastName
	claims["email"] = user.Email
	claims["exp"] = time.Now().Add(time.Hour * 100).Unix()

	tokenString, err := token.SignedString(mySigningKey)

	if err != nil {
		fmt.Errorf("Something went wrong: %v", err.Error())
		return "", err

	}

	return tokenString, nil

}
