package adapters

type FileProcessorAdapter struct {
	fileId string
}

func (fileProcessorAdapter *FileProcessorAdapter) NewFileProcessor(fileId string) FileProcessorAdapter {
	return FileProcessorAdapter{
		fileId: fileId,
	}
}

func (fileProcessorAdapter *FileProcessorAdapter) DownloadFile() (string, error) {
	/*
		AWS/Azure/GCP specifics to be added here
	*/
	return "img.jpg", nil
}

func (fileProcessorAdapter *FileProcessorAdapter) UploadFile() (string, error) {
	/*
		AWS/Azure/GCP specifics to be added here
	*/
	return "fileID", nil
}

func (fileProcessorAdapter *FileProcessorAdapter) PurgeDownloadedFile(downloadPath string) bool {
	return true
}
