package usecase

import "errors"

func FileTransform(dependencies Dependencies) func(string, []string, []string) (string, error) {
	return func(imageId string, transformOptions []string, formatConversionOptions []string) (string, error) {
		fileProcessorAdapter := dependencies.FileProcessor.NewFileProcessor(imageId)
		// Download file from remote
		downloadPath, err := fileProcessorAdapter.DownloadFile()
		if err != nil {
			return "", errors.New("unable to download file")
		}

		// Upload file to remote
		uploadedFileId, err := fileProcessorAdapter.UploadFile()
		if err != nil {
			return "", errors.New("unable to upload file")
		}

		// Clean up
		fileProcessorAdapter.PurgeDownloadedFile(downloadPath)
		return uploadedFileId, nil
	}
}
