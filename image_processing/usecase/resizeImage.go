package usecase

import "errors"

func ResizeImage(dependencies Dependencies) func(string, int, int) (string, error) {
	return func(imageFileName string, height int, width int) (string, error) {
		imageProcessorAdapter := dependencies.ImageProcessor.NewImageProcessor(imageFileName, height, width)
		processedPath, err := imageProcessorAdapter.Resize(height, width)
		if err != nil {
			return "", errors.New("unable to resize image")
		}
		return processedPath, nil
	}
}
