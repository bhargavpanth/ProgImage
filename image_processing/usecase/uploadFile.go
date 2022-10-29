package usecase

import "errors"

func UploadFile(dependencies Dependencies) func(string) (string, error) {
	return func(filePath string) (string, error) {
		fileProcessor := dependencies.FileProcessor.NewFileProcessor(filePath)
		uploadedFileId, err := fileProcessor.UploadFile()
		if err != nil {
			return "", errors.New("unable to upload file")
		}
		return uploadedFileId, nil
	}
}
