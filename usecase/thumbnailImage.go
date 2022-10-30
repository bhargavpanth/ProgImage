package usecase

import "errors"

func ConvertImageToThumbnail(dependencies Dependencies) func(string) (string, error) {
	return func(imageFileName string) (string, error) {
		imageProcessorAdapter := dependencies.ImageProcessor.NewImageProcessor(imageFileName, 0, 0)
		writePath, err := imageProcessorAdapter.MakeThumbnail()
		if err != nil {
			return "", errors.New("unable to create a thumbnail")
		}
		return writePath, nil
	}
}
