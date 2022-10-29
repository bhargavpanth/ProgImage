package middleware
import (
	"net/http"
	"fmt"
	"server/lib"
)

func DownloadFile(w http.ResponseWriter, r *http.Request) {
	// simulating an upload URL
	var downloadTo = "./img/download/img.jpeg"
	// simulating a downstream file-system
	var downloadFrom = "./img/upload/"
	lib.DownloadFile(downloadFrom, downloadTo)

	fmt.Fprintf(w, "Downloading a file")
}

func UploadFile(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Uploading a file")
}
