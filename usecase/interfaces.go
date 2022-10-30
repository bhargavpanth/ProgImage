package usecase

import (
	adapters "image_processing/adapters"
)

type Dependencies struct {
	ImageProcessor adapters.ImageProcessingAdapter
	FileProcessor  adapters.FileProcessorAdapter
}
