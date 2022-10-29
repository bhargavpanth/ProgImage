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
	resizeHeight, resizeWidth := 200, 200

	path, err := ResizeImage(dependencies)(img, resizeHeight, resizeWidth)

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

	if convertedImage.Width != resizeWidth || convertedImage.Height != resizeHeight {
		t.Errorf("Invalid image size: %dx%d expected %dx%d", convertedImage.Width, convertedImage.Height, resizeHeight, resizeWidth)
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
