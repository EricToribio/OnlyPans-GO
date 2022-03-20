package controllers

import (
	"encoding/json"
	"fmt"
	"github.com/erictoribio/go-api/pkg/models"
	"github.com/erictoribio/go-api/pkg/utils"
	"net/http"
)

func CreateRecipe(w http.ResponseWriter, r *http.Request) {
	CreateRecipe := &models.Recipe{}
	utils.ParseBody(r, CreateRecipe)
	fmt.Println(r)
	CreateRecipe.NewRecipe()
	res, _ := json.Marshal(CreateRecipe)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

func GetRecipes(w http.ResponseWriter, r *http.Request) {
	recipes := models.GetAllRecipes()
	res, _ := json.Marshal(recipes)
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}
