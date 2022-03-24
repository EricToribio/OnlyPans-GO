package controllers

import (
	"encoding/json"
	"fmt"
	"github.com/erictoribio/go-api/pkg/models"
	"github.com/erictoribio/go-api/pkg/utils"
	"net/http"
)

func GetUsers(w http.ResponseWriter, r *http.Request) {
	users := models.GetAllUsers()
	res, _ := json.Marshal(users)
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

func CreateUser(w http.ResponseWriter, r *http.Request) {
	CreateUser := &models.User{}
	utils.ParseBody(r, CreateUser)
	validUser, lenOfErr := models.ValidUser(CreateUser)
	fmt.Println(lenOfErr, validUser)
	if lenOfErr != 0 {
		res := map[string]interface{}{
			"error": validUser,
		}
		e, _ := json.Marshal(res)
		w.Write(e)
	} else if models.FindUserByEmail(CreateUser.Email) == true {
		user, _ := models.GetUserByEmail(CreateUser.Email)
		if user.GoogleUser {
			fmt.Println("google")
			res := map[string]map[string]string{
				"error": {"email": "Please sign in with Google"},
			}
			e, _ := json.Marshal(res)
			w.Write(e)
		} else {
			type Error struct {
				err string
			}
			res := map[string]map[string]string{
				"error": {"email": "User already exists"},
			}
			e, _ := json.Marshal(res)
			w.Write(e)
		}
	} else {
		CreateUser.GoogleUser = false
		CreateUser.Password = models.HashPassword(CreateUser.Password)
		CreateUser.CreateUser()
		jwt, err := models.GenerateJwt(CreateUser)
		if err != nil {
			fmt.Println("Error generating JWT", err.Error())
		}
		res, _ := json.Marshal(jwt)
		w.WriteHeader(http.StatusOK)
		w.Write(res)
	}
}

func Login(w http.ResponseWriter, r *http.Request) {
	PotentialLogin := &models.User{}
	utils.ParseBody(r, PotentialLogin)
	user, err := models.GetUserByEmail(PotentialLogin.Email)
	if err.Error() == "no user" {
		res := map[string]string{
			"error": "Invalid Email or Password",
		}
		e, _ := json.Marshal(res)
		w.Write(e)
	} else if user.GoogleUser {
		res := map[string]string{
			"error": "Sign in Using Google Login",
		}
		e, _ := json.Marshal(res)
		w.Write(e)
	} else if !models.CheckPasswordHash(PotentialLogin.Password, user.Password) {
		res := map[string]string{
			"error": "Invalid Email or Password",
		}
		e, _ := json.Marshal(res)
		w.Write(e)
	} else {
		jwt, err := models.GenerateJwt(user)
		if err != nil {
			fmt.Println("Error generating JWT", err.Error())
		}
		res, _ := json.Marshal(jwt)
		w.WriteHeader(http.StatusOK)
		w.Write(res)
	}
}

func GoogleLogin(w http.ResponseWriter, r *http.Request) {
	GoogleUser := &models.GoogleUser{}
	utils.ParseBody(r, &GoogleUser)
	fmt.Println(GoogleUser)
	user, err := models.GetUserByEmail(GoogleUser.Email)
	if !user.GoogleUser {
		res := map[string]string{
			"error": "Please sign in User already has a non Google account",
		}
		e, _ := json.Marshal(res)
		w.Write(e)
	}
	CreateUser := &models.User{}
	CreateUser.Email = GoogleUser.Email
	CreateUser.FirstName = GoogleUser.GivenName
	CreateUser.LastName = GoogleUser.FamilyName
	CreateUser.ProfileAvatar = GoogleUser.ImageUrl
	CreateUser.GoogleUser = true
	CreateUser.Password = models.HashPassword(GoogleUser.ImageUrl + GoogleUser.Email)
	if err.Error() == "no user" {
		CreateUser.CreateUser()
	}
	jwt, err := models.GenerateJwt(CreateUser)
	if err != nil {
		fmt.Println("Error generating JWT", err.Error())
	}
	res, _ := json.Marshal(jwt)
	w.Write(res)
}
