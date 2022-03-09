package main

import (
	"github.com/erictoribio/go-api/pkg/routes"
	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
	_ "github.com/jinzhu/gorm/dialects/mysql"
	"log"
	"net/http"
)

func main() {
	r := mux.NewRouter()
	routes.UserRoutes(r)
	http.Handle("/", r)
	origins := handlers.AllowedOrigins([]string{"localhost:3000"})
	log.Fatal(http.ListenAndServe("localhost:8080", handlers.CORS(origins)(r)))
}
