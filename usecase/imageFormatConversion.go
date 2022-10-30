package usecase

import "errors"

func ConvertImageFormat(dependencies Dependencies) func(string, string) (string, error) {
	return func(imageFileName string, conversionFormat string) (string, error) {
		imageProcessorAdapter := dependencies.ImageProcessor.NewImageProcessor(imageFileName, 0, 0)
		processedPath, err := imageProcessorAdapter.ConvertImageFormat(conversionFormat)
		if err != nil {
			return "", errors.New("unable to convert image file format")
		}
		return processedPath, nil
	}
}
