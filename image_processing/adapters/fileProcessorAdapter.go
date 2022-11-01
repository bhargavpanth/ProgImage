package adapters

import (
	"errors"
	"os"
	"path"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/credentials"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/s3"
	"github.com/aws/aws-sdk-go/service/s3/s3manager"
)

type FileProcessorAdapter struct {
	fileId string
}

func (fileProcessorAdapter *FileProcessorAdapter) NewFileProcessor(fileId string) FileProcessorAdapter {
	return FileProcessorAdapter{
		fileId: fileId,
	}
}

func (fileProcessorAdapter *FileProcessorAdapter) DownloadFile() (string, error) {
	bucket := os.Getenv("AWS_DEFAULT_BUCKET")
	region := os.Getenv("AWS_DEFAULT_REGION")
	realtivePath := os.Getenv("DOWNLOADS")

	readPath := path.Join(realtivePath, fileProcessorAdapter.fileId)

	file, err := os.Create(readPath)
	if err != nil {
		return "", errors.New("unable to create image")
	}

	defer file.Close()

	sess, _ := session.NewSession(&aws.Config{
		Region:      aws.String(region),
		Credentials: credentials.AnonymousCredentials,
	})

	downloader := s3manager.NewDownloader(sess)

	_, err = downloader.Download(file,
		&s3.GetObjectInput{
			Bucket: aws.String(bucket),
			Key:    aws.String(fileProcessorAdapter.fileId),
		})
	println(err.Error())

	if err != nil {
		return "", errors.New("unable to download image")
	}

	return file.Name(), nil
}

func (fileProcessorAdapter *FileProcessorAdapter) UploadFile() (string, error) {
	bucket := os.Getenv("AWS_DEFAULT_BUCKET")
	region := os.Getenv("AWS_DEFAULT_REGION")
	realtivePath := os.Getenv("DOWNLOADS")

	readPath := path.Join(realtivePath, fileProcessorAdapter.fileId)

	file, err := os.Create(readPath)
	if err != nil {
		return "", errors.New("unable to open file image")
	}

	defer file.Close()

	sess, _ := session.NewSession(&aws.Config{
		Region:      aws.String(region),
		Credentials: credentials.AnonymousCredentials,
	})

	uploader := s3manager.NewUploader(sess)

	_, err = uploader.Upload(&s3manager.UploadInput{
		Bucket: aws.String(bucket),
		Key:    aws.String(fileProcessorAdapter.fileId),
	})

	if err != nil {
		return "", errors.New("unable to upload image")
	}

	return fileProcessorAdapter.fileId, nil
}

func (fileProcessorAdapter *FileProcessorAdapter) PurgeDownloadedFile(downloadPath string) bool {
	realtivePath := os.Getenv("DOWNLOADS")
	readPath := path.Join(realtivePath, fileProcessorAdapter.fileId)
	err := os.Remove(readPath)
	return err == nil
}
