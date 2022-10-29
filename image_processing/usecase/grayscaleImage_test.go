package usecase

import (
	adapters "image_processing/adapters"
	"testing"

	"github.com/h2non/bimg"
)

func TestGrayScaleImage(t *testing.T) {
	dependencies := Dependencies{
		FileProcessor:  adapters.FileProcessorAdapter{},
		ImageProcessor: adapters.ImageProcessingAdapter{},
	}

	img := "img.jpg"

	path, err := GrayScaleImage(dependencies)(img)
	if err != nil {
		t.Errorf("ConvertImageToGrayscale use case failed to read")
	}

	buffer, err := bimg.Read(path)
	if err != nil {
		t.Errorf("ConvertImageToGrayscale use case failed to read converted image")
	}

	colourSpace, _ := bimg.ImageInterpretation(buffer)
	if colourSpace != bimg.InterpretationBW {
		t.Errorf("Invalid colour space")
	}
}

func TestGrayScaleImageWithWrongPath(t *testing.T) {
	dependencies := Dependencies{
		FileProcessor:  adapters.FileProcessorAdapter{},
		ImageProcessor: adapters.ImageProcessingAdapter{},
	}

	nonExistingImg := "nonExisting.jpg"
	_, err := GrayScaleImage(dependencies)(nonExistingImg)
	if err == nil {
		t.Errorf("GrayScaleImage use case should fail to read the image")
	}
}
