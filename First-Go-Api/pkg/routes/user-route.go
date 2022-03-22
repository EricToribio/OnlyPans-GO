package routes

import (
	"github.com/erictoribio/go-api/pkg/controllers"
	"github.com/gorilla/mux"
)

var UserRoutes = func(router *mux.Router) {
	// -------------user routes----------------//
	router.HandleFunc("/api/new/user", controllers.CreateUser).Methods("POST")
	router.HandleFunc("/api/all/users", controllers.GetUsers).Methods("GET")
	router.HandleFunc("/api/login", controllers.Login).Methods("POST")
	router.HandleFunc("/api/new/recipe", controllers.CreateRecipe).Methods("Post")
	router.HandleFunc("/api/all/recipes", controllers.GetRecipes).Methods("GET")
}
