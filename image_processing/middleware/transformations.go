package middleware

import (
	"encoding/json"
	"net/http"

	adapters "image_processing/adapters"
	"image_processing/usecase"

	"github.com/gorilla/mux"
)

type InvalidRequest struct {
	Message string `json:"messgae"`
}

type ValidReponse struct {
	FileId string `json:"fileId"`
}

type InternalServerError struct {
	Message string `json:"message"`
}

func FileTransform(w http.ResponseWriter, r *http.Request) {
	imageId := mux.Vars(r)["image_id"]
	transformOptions := r.URL.Query()["options"]
	formatConversionOptions := r.URL.Query()["format"]

	dependencies := usecase.Dependencies{
		FileProcessor:  adapters.FileProcessorAdapter{},
		ImageProcessor: adapters.ImageProcessingAdapter{},
	}

	fileId, err := usecase.FileTransform(dependencies)(
		imageId, transformOptions, formatConversionOptions,
	)
	if err != nil {
		w.Header().Set("Content-Type", "application/json")
		response := InternalServerError{
			Message: "unable to process request",
		}
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(response)
	}

	w.Header().Set("Content-Type", "application/json")
	response := ValidReponse{
		FileId: fileId,
	}
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(response)
}
