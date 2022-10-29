package usecase

import (
	adapters "image_processing/adapters"
	"testing"

	"github.com/h2non/bimg"
)

func TestResizeImage(t *testing.T) {
	dependencies := Dependencies{
		FileProcessor:  adapters.FileProcessorAdapter{},
		ImageProcessor: adapters.ImageProcessingAdapter{},
	}

	img := "img.jpg"

	path, err := ResizeImage(dependencies)(img, 200, 200)

	if err != nil {
		t.Errorf("ResizeImage use case failed to read")
	}

	buffer, err := bimg.Read(path)
	if err != nil {
		t.Errorf("ResizeImage use case failed to read converted image")
	}

	convertedImage, err := bimg.NewImage(buffer).Size()
	if err != nil {
		t.Errorf("ResizeImage use case failed to read after conversion")
	}

	if convertedImage.Width != 200 || convertedImage.Height != 200 {
		t.Errorf("Invalid image size: %dx%d expected %dx%d", convertedImage.Width, convertedImage.Height, 100, 100)
	}
}

func TestResizeImageWithWrongPath(t *testing.T) {
	dependencies := Dependencies{
		FileProcessor:  adapters.FileProcessorAdapter{},
		ImageProcessor: adapters.ImageProcessingAdapter{},
	}

	nonExistingImg := "nonExisting.jpg"
	_, err := ResizeImage(dependencies)(nonExistingImg, 0, 0)
	if err == nil {
		t.Errorf("GrayScaleImage use case should fail to read the image")
	}
}
