package models

import (
	"errors"
	"fmt"
	jwt "github.com/dgrijalva/jwt-go"
	"github.com/erictoribio/go-api/pkg/config"
	_ "github.com/go-sql-driver/mysql"
	"github.com/jinzhu/gorm"
	"golang.org/x/crypto/bcrypt"
	"regexp"
	"time"
)

var db *gorm.DB
var mySigningKey = []byte("mysupersecretphrase")

type GoogleUser struct {
	Email      string `json: "email"`
	FamilyName string `json : "familyName"`
	GivenName  string `json :"givenName"`
	GoogleId   string `json: "googleId"`
	ImageUrl   string `json : "imageUrl"`
}

type User struct {
	gorm.Model
	FirstName     string `gorm:"not null" json:"firstName"`
	LastName      string `json:"lastName"`
	Email         string `"json:"email"`
	Password      string `"json:"password"`
	ProfileAvatar string `json:"profileAvatar"`
	GoogleUser    bool
	Recipes       []LikedRecipe `gorm: "foreignKey: user_id "`
}

func init() {
	config.Connect()
	db = config.GetDB()
	db.AutoMigrate(&LikedRecipe{}, &User{})
	db.Debug().Model(&LikedRecipe{}).AddForeignKey("user_id", "users(id)", "cascade", "cascade")
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
	fmt.Println(user.ID)
	recipes := GetAllUsersLikedRecipes(user.ID)
	fmt.Println(recipes)
	token := jwt.New(jwt.SigningMethodHS256)
	claims := token.Claims.(jwt.MapClaims)
	claims["profileAvatar"] = user.ProfileAvatar
	claims["user_id"] = user.ID
	claims["firstName"] = user.FirstName
	claims["lastName"] = user.LastName
	claims["email"] = user.Email
	claims["likedRecipes"] = recipes
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

func GetUserById(id uint) *User {
	var user User
	db.Raw("SELECT * users WHERE id = ?", id).Scan(&user)
	return &user
}

func GetUserByEmail(email string) (*User, error) {
	var User User
	db.Find(&User, "email = ?", email)
	if User.Email == "" {
		err := errors.New("no user")
		return &User, err
	}
	return &User, errors.New("nil")
}
