package usecase

import (
	adapters "image_processing/adapters"
	"os"
	"testing"

	"github.com/h2non/bimg"
)

func TestConvertImageFormatToPNG(t *testing.T) {
	os.Setenv("DOWNLOADS", "../downloads")
	os.Setenv("AWS_DEFAULT_REGION", "us-east-1")
	os.Setenv("AWS_DEFAULT_BUCKET", "default_bucket")
	dependencies := Dependencies{
		FileProcessor:  adapters.FileProcessorAdapter{},
		ImageProcessor: adapters.ImageProcessingAdapter{},
	}

	img := "img.jpg"

	path, err := ConvertImageFormat(dependencies)(img, "PNG")
	if err != nil {
		t.Errorf("ConvertImageFormat use case failed to read image")
	}

	buffer, err := bimg.Read(path)
	if err != nil {
		t.Errorf("ConvertImageToGrayscale use case failed to read converted image")
	}

	if bimg.NewImage(buffer).Type() != "png" {
		t.Errorf("Image was not converted into PNG")
	}
}

func TestConvertImageFormatToJPEG(t *testing.T) {
	os.Setenv("DOWNLOADS", "../downloads")
	os.Setenv("AWS_DEFAULT_REGION", "us-east-1")
	os.Setenv("AWS_DEFAULT_BUCKET", "default_bucket")
	dependencies := Dependencies{
		FileProcessor:  adapters.FileProcessorAdapter{},
		ImageProcessor: adapters.ImageProcessingAdapter{},
	}

	img := "img.png"

	path, err := ConvertImageFormat(dependencies)(img, "JPEG")
	if err != nil {
		t.Errorf("ConvertImageFormat use case failed to read image")
	}

	buffer, err := bimg.Read(path)
	if err != nil {
		t.Errorf("ConvertImageToGrayscale use case failed to read converted image")
	}

	if bimg.NewImage(buffer).Type() != "jpeg" {
		t.Errorf("Image was not converted into JPEG")
	}
}

func TestConvertImageFormatToAnUnsuportedFileFormat(t *testing.T) {
	os.Setenv("DOWNLOADS", "../downloads")
	os.Setenv("AWS_DEFAULT_REGION", "us-east-1")
	os.Setenv("AWS_DEFAULT_BUCKET", "default_bucket")
	dependencies := Dependencies{
		FileProcessor:  adapters.FileProcessorAdapter{},
		ImageProcessor: adapters.ImageProcessingAdapter{},
	}

	img := "img.png"

	_, err := ConvertImageFormat(dependencies)(img, "WEBP")
	if err == nil {
		t.Errorf("ConvertImageFormat did not fail when trying to convert image into a non-existant format")
	}
}

func TestConvertImageFormatWithWrongPath(t *testing.T) {
	os.Setenv("DOWNLOADS", "../downloads")
	os.Setenv("AWS_DEFAULT_REGION", "us-east-1")
	os.Setenv("AWS_DEFAULT_BUCKET", "default_bucket")
	dependencies := Dependencies{
		FileProcessor:  adapters.FileProcessorAdapter{},
		ImageProcessor: adapters.ImageProcessingAdapter{},
	}

	nonExistingImg := "nonExisting.jpg"
	_, err := ConvertImageFormat(dependencies)(nonExistingImg, "PNG")
	if err == nil {
		t.Errorf("ConvertImageFormat use case should fail to read the image")
	}
}
