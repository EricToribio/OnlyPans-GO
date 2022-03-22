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
		type Error struct {
			err string
		}
		res := map[string]string{
			"error": "User already exists",
		}
		e, _ := json.Marshal(res)
		w.Write(e)
	} else {
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
	user, err := models.GetUserByEmail(PotentialLogin)
	if err.Error() == "invalid email or password" {
		res := map[string]string{
			"error": "Invalid Email or Password",
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
