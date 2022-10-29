package usecase

func ConvertImageFormat(dependencies Dependencies) func(string) (string, error) {
	return func(imageFileName string) (string, error) {
		// imageProcessorAdapter := dependencies.ImageProcessor.NewImageProcessor(path, 0, 0)
		// processedPath, err := imageProcessorAdapter.GrayScale()
		// if err != nil {
		// 	return "", errors.New("unable to convert image file format")
		// }
		return "", nil
	}
}
