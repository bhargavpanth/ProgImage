package main
import (
	"net/http"
	"server/middleware"
)

func main() {
	http.HandleFunc("/download", middleware.DownloadFile)

	http.HandleFunc("/upload", middleware.UploadFile)

	http.ListenAndServe("0.0.0.0:3000", nil)
}
