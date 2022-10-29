package main

import (
	// "os"
	// "encoding/json"
	"image_processing/middleware"
	"log"
	"net/http"
	"time"

	"github.com/gorilla/mux"
)

func main() {
	router := mux.NewRouter()

	subrouter := router.PathPrefix("/transform").Subrouter()

	subrouter.HandleFunc("/{image_id}", middleware.FileTransform)

	// PORT := os.Getenv("PORT")
	// IP := os.Getenv("IP")
	// IP + ":" + PORT

	srv := &http.Server{
		Handler:      router,
		Addr:         "0.0.0.0:4000",
		WriteTimeout: 15 * time.Second,
		ReadTimeout:  15 * time.Second,
	}

	log.Fatal(srv.ListenAndServe())
}
