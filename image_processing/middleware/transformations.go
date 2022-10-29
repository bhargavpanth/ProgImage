package middleware

import (
	"encoding/json"
	"net/http"
	"strings"

	adapters "image_processing/adapters"
	usecase "image_processing/usecase"

	"github.com/gorilla/mux"
)

type InvalidRequest struct {
	Message string `json:"messgae"`
}

type ValidReponse struct {
	Path string `json:"path"`
}

type InternalServerError struct {
	Message string `json:"message"`
}

func FileTransform(w http.ResponseWriter, r *http.Request) {
	transformOptions := r.URL.Query().Get("options")
	imageId := mux.Vars(r)["image_id"]

	dependencies := usecase.Dependencies{
		FileProcessor:  adapters.FileProcessorAdapter{},
		ImageProcessor: adapters.ImageProcessingAdapter{},
	}

	downloadPath, err := usecase.DownloadFile(dependencies)(imageId)
	if err != nil {
		w.Header().Set("Content-Type", "application/json")
		response := InternalServerError{
			Message: "Unable to process request",
		}
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(response)
	}

	for _, s := range strings.Split(transformOptions, ",") {
		switch s {
		case "thumbnail":
			usecase.ConvertImageToThumbnail(dependencies)(downloadPath)
		}
	}

	uploadedFileId, err := usecase.UploadFile(dependencies)(downloadPath)
	if err != nil {
		w.Header().Set("Content-Type", "application/json")
		response := InternalServerError{
			Message: "Unable to process request",
		}
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(response)
	}

	w.Header().Set("Content-Type", "application/json")
	response := ValidReponse{
		Path: uploadedFileId,
	}
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(response)
}
