package controllers

import (
	"encoding/json"
	"fmt"
	"github.com/erictoribio/go-api/pkg/models"
	"github.com/erictoribio/go-api/pkg/utils"
	"net/http"
)

func CreateRecipe(w http.ResponseWriter, r *http.Request) {
	CreateRecipe := &models.LikedRecipe{}
	utils.ParseBody(r, CreateRecipe)
	CreateRecipe.NewRecipe()

	res, _ := json.Marshal(CreateRecipe)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

func GetRecipes(w http.ResponseWriter, r *http.Request) {
	User := &models.User{}
	utils.ParseBody(r, User)
	fmt.Println(User, User.ID)
	recipes := models.GetAllUsersLikedRecipes(User.ID)
	res, _ := json.Marshal(recipes)
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

func DeleteLikedRecipe(w http.ResponseWriter, r *http.Request) {

	request := &models.Req{}
	utils.ParseBody(r, request)
	fmt.Println(request)
	deleted := models.DeleteLikedRecipe(request)
	fmt.Println(deleted)
}
