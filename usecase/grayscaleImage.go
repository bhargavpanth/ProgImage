package usecase

import "errors"

func GrayScaleImage(dependencies Dependencies) func(string) (string, error) {
	return func(imageFileName string) (string, error) {
		imageProcessorAdapter := dependencies.ImageProcessor.NewImageProcessor(imageFileName, 0, 0)
		processedPath, err := imageProcessorAdapter.GrayScale()
		if err != nil {
			return "", errors.New("unable to convert image to grayscale")
		}
		return processedPath, nil
	}
}
