package routes

import (
	"github.com/erictoribio/go-api/pkg/controllers"
	"github.com/gorilla/mux"
)

var UserRoutes = func(router *mux.Router) {
	router.HandleFunc("/new/user", controllers.CreateUser).Methods("POST")
	router.HandleFunc("/all/users", controllers.GetUsers).Methods("GET")

}
