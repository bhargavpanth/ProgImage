package main

import (
	"image_processing/middleware"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/gorilla/mux"
)

// http://localhost:4000/transform/img1234?options=thumbnail&options=grayscale&format={PNG,JPEG}
func main() {
	router := mux.NewRouter()

	subrouter := router.PathPrefix("/transform").Subrouter()

	subrouter.HandleFunc("/{image_id}", middleware.FileTransform)

	// PORT := os.Getenv("PORT")
	// IP := os.Getenv("IP")
	// IP + ":" + PORT

	os.Setenv("DOWNLOADS", "./downloads")
	os.Setenv("AWS_DEFAULT_REGION", "us-east-1")
	os.Setenv("AWS_DEFAULT_BUCKET", "default_bucket")

	srv := &http.Server{
		Handler:      router,
		Addr:         "0.0.0.0:4000",
		WriteTimeout: 15 * time.Second,
		ReadTimeout:  15 * time.Second,
	}

	log.Fatal(srv.ListenAndServe())
}
