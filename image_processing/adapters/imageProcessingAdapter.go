package adapters

import (
	"errors"
	"path"

	"github.com/h2non/bimg"
)

type ImageProcessingAdapter struct {
	fileName string
	height   int
	width    int
}

func (imageProcessingAdapter *ImageProcessingAdapter) NewImageProcessor(fileName string, height int, width int) ImageProcessingAdapter {
	return ImageProcessingAdapter{
		fileName: fileName,
		height:   height,
		width:    width,
	}
}

func (imageProcessingAdapter *ImageProcessingAdapter) MakeThumbnail() (string, error) {
	readPath := path.Join("../downloads", imageProcessingAdapter.fileName)

	buffer, err := bimg.Read(readPath)
	if err != nil {
		return "", errors.New("unable to read image")
	}

	thumbnailImage, err := bimg.NewImage(buffer).Thumbnail(100)
	if err != nil {
		return "", errors.New("unable to make thumbnail from image")
	}

	writePath := path.Join("../downloads", imageProcessingAdapter.fileName)
	bimg.Write(writePath, thumbnailImage)

	return writePath, nil
}

func (imageProcessingAdapter *ImageProcessingAdapter) Resize(height int, width int) (string, error) {
	readPath := path.Join("../downloads", imageProcessingAdapter.fileName)

	buffer, err := bimg.Read(readPath)
	if err != nil {
		return "", errors.New("unable to read image")
	}

	// Note: Fallback or check validity
	resizedImage, err := bimg.NewImage(buffer).Resize(height, width)
	if err != nil {
		return "", errors.New("unable to resize image")
	}

	writePath := path.Join("../downloads", imageProcessingAdapter.fileName)
	bimg.Write(writePath, resizedImage)

	return writePath, nil
}

func (imageProcessingAdapter *ImageProcessingAdapter) GrayScale() (string, error) {
	readPath := path.Join("../downloads", imageProcessingAdapter.fileName)

	buffer, err := bimg.Read(readPath)
	if err != nil {
		return "", errors.New("unable to read image")
	}

	grayscaleImage, err := bimg.NewImage(buffer).Colourspace(bimg.InterpretationBW)
	if err != nil {
		return "", errors.New("unable to convert image to grayscale")
	}

	writePath := path.Join("../downloads", imageProcessingAdapter.fileName)
	bimg.Write(writePath, grayscaleImage)

	return writePath, nil
}

func (imageProcessingAdapter *ImageProcessingAdapter) ConvertImageFormat(format string) (string, error) {
	readPath := path.Join("../downloads", imageProcessingAdapter.fileName)

	buffer, err := bimg.Read(readPath)
	if err != nil {
		return "", errors.New("unable to read image")
	}

	switch format {
	case "PNG":
		newImage, err := bimg.NewImage(buffer).Convert(bimg.PNG)
		if err != nil {
			return "", errors.New("unable to read image")
		}

		writePath := path.Join("../downloads", imageProcessingAdapter.fileName)
		bimg.Write(writePath, newImage)

		return writePath, nil
	case "JPEG":
		newImage, err := bimg.NewImage(buffer).Convert(bimg.JPEG)
		if err != nil {
			return "", errors.New("unable to read image")
		}

		writePath := path.Join("../downloads", imageProcessingAdapter.fileName)
		bimg.Write(writePath, newImage)

		return writePath, nil
	default:
		return "", errors.New("conversion format unsupported")
	}
}
