package models

import (
	"fmt"
	jwt "github.com/dgrijalva/jwt-go"
	"github.com/erictoribio/go-api/pkg/config"
	// "github.com/erictoribio/go-api/pkg/utils"
	_ "github.com/go-sql-driver/mysql"
	"github.com/jinzhu/gorm"
	"golang.org/x/crypto/bcrypt"
	"regexp"
	"time"
)

var db *gorm.DB
var mySigningKey = []byte("mysupersecretphrase")

type User struct {
	gorm.Model
	FirstName   string        `gorm:"not null" json:"firstName"`
	LastName    string        `json:"lastName"`
	Email       string        `"json:"email"`
	Password    string        `"json:"password"`
	Recipes     []Recipe      `gorm: "foreignKey: user_id "`
	Users       []User        `gorm: "foreignKey: user_id "`
	LikedRecipe []LikedRecipe `gorm: "foreignKey: user_id "`
}

func init() {
	config.Connect()
	db = config.GetDB()
	db.AutoMigrate(&LikedUser{}, &LikedRecipe{}, &Recipe{}, &User{})
	db.Debug().Model(&Recipe{}).AddForeignKey("user_id", "users(id)", "cascade", "cascade")
	db.Debug().Model(&LikedRecipe{}).AddForeignKey("user_id", "users(id)", "cascade", "cascade")
	db.Debug().Model(&LikedRecipe{}).AddForeignKey("recipe_id", "recipes(id)", "cascade", "cascade")
	db.Debug().Model(&LikedUser{}).AddForeignKey("user_id", "users(id)", "cascade", "cascade")
	db.Debug().Model(&LikedUser{}).AddForeignKey("liked", "users(id)", "cascade", "cascade")
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

func ValidUser(user *User) (map[string]string, int) {
	tests := []string{".{7,}", "[a-z]", "[A-Z]", "[0-9]", "[^\\d\\w]"}
	emailRegex := regexp.MustCompile(`^[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,4}$`)

	fmt.Println(user)
	err := make(map[string]string)
	if len(user.FirstName) < 3 {
		err["firstName"] = "First name must be at least 3 characters"
	}
	if len(user.LastName) < 3 {
		err["lastName"] = "Last name must be at least 3 characters"
	}
	if !emailRegex.MatchString(user.Email) {
		err["email"] = "Enter a valid email address"
	}
	for _, test := range tests {
		valid, _ := regexp.MatchString(test, user.Password)
		if !valid {
			err["password"] = "Password must have at least 1 lowercase letter, 1 uppercase letter,1 number, 1 special character and be at least 7 characters long"
		}
	}
	return err, len(err)

}
