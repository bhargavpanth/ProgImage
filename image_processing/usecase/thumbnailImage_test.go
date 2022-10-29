package usecase

import (
	adapters "image_processing/adapters"
	"testing"

	"github.com/h2non/bimg"
)

func TestThumbnailImage(t *testing.T) {
	dependencies := Dependencies{
		FileProcessor:  adapters.FileProcessorAdapter{},
		ImageProcessor: adapters.ImageProcessingAdapter{},
	}

	img := "img.jpg"

	path, err := ConvertImageToThumbnail(dependencies)(img)
	if err != nil {
		t.Errorf("ConvertImageToThumbnail use case failed to read")
	}

	buffer, err := bimg.Read(path)
	if err != nil {
		t.Errorf("ConvertImageToThumbnail use case failed to read converted image")
	}

	convertedImage, err := bimg.NewImage(buffer).Size()
	if err != nil {
		t.Errorf("ConvertImageToThumbnail use case failed to read after conversion")
	}

	if convertedImage.Width != 100 || convertedImage.Height != 100 {
		t.Errorf("Invalid image size: %dx%d expected %dx%d", convertedImage.Width, convertedImage.Height, 100, 100)
	}
}

func TestThumbnailImageWithWrongPath(t *testing.T) {
	dependencies := Dependencies{
		FileProcessor:  adapters.FileProcessorAdapter{},
		ImageProcessor: adapters.ImageProcessingAdapter{},
	}

	nonExistingImg := "nonExisting.jpg"
	_, err := ConvertImageToThumbnail(dependencies)(nonExistingImg)
	if err == nil {
		t.Errorf("ConvertImageToThumbnail use case should fail to read the image")
	}
}
