package usecase

import (
	"errors"
)

func FileTransform(dependencies Dependencies) func(string, []string, []string) (string, error) {
	return func(imageId string, transformOptions []string, formatConversionOptions []string) (string, error) {
		fileProcessorAdapter := dependencies.FileProcessor.NewFileProcessor(imageId)

		println("------------IMAGE_PROCESSING_MS-----------------")
		println(imageId, transformOptions, formatConversionOptions)
		println("------------IMAGE_PROCESSING_MS-----------------")

		// Download file from remote
		downloadedFileName, err := fileProcessorAdapter.DownloadFile()
		if err != nil {
			return "", errors.New("unable to download file")
		}

		// Handling file transformations
		for _, operation := range transformOptions {
			switch operation {
			case "grayscale":
				GrayScaleImage(dependencies)(downloadedFileName)
			case "thumbnail":
				ConvertImageToThumbnail(dependencies)(downloadedFileName)
			}
		}

		// Handling format conversions
		if len(formatConversionOptions) > 0 {
			switch formatConversionOptions[0] {
			case "PNG":
				ConvertImageFormat(dependencies)(downloadedFileName, "PNG")
			case "JPEG":
				ConvertImageFormat(dependencies)(downloadedFileName, "JPEG")
			}
		}

		// Upload file to remote
		uploadedFileId, err := fileProcessorAdapter.UploadFile()
		if err != nil {
			return "", errors.New("unable to upload file")
		}

		// Clean up
		fileProcessorAdapter.PurgeDownloadedFile(downloadedFileName)
		return uploadedFileId, nil
	}
}
