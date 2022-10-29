package usecase

import "errors"

func DownloadFile(dependencies Dependencies) func(string) (string, error) {
	return func(fileId string) (string, error) {
		fileProcessorAdapter := dependencies.FileProcessor.NewFileProcessor(fileId)
		downloadPath, err := fileProcessorAdapter.DownloadFile()
		if err != nil {
			return "", errors.New("unable to download file")
		}
		return downloadPath, nil
	}
}
