package adapters

import (
	"crypto/sha256"
	"encoding/hex"
	"errors"
	"io"
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

	hash, err := calculateFileHash(fileProcessorAdapter.fileId)
	if err != nil {
		return "", errors.New("unable to genenrate key for upload")
	}

	key := hash + fileProcessorAdapter.fileId

	defer file.Close()

	sess, _ := session.NewSession(&aws.Config{
		Region:      aws.String(region),
		Credentials: credentials.AnonymousCredentials,
	})

	uploader := s3manager.NewUploader(sess)

	_, err = uploader.Upload(&s3manager.UploadInput{
		Bucket: aws.String(bucket),
		Key:    aws.String(key),
	})

	if err != nil {
		return "", errors.New("unable to upload image")
	}

	return key, nil
}

func (fileProcessorAdapter *FileProcessorAdapter) PurgeDownloadedFile(downloadPath string) bool {
	realtivePath := os.Getenv("DOWNLOADS")
	readPath := path.Join(realtivePath, fileProcessorAdapter.fileId)
	err := os.Remove(readPath)
	return err == nil
}

func calculateFileHash(fileName string) (string, error) {
	realtivePath := os.Getenv("DOWNLOADS")
	readPath := path.Join(realtivePath, fileName)
	filePath, err := os.Open(readPath)
	if err != nil {
		return "", errors.New("unable to read file")
	}
	defer filePath.Close()
	hasher := sha256.New()
	if _, err := io.Copy(hasher, filePath); err != nil {
		return "", errors.New("unable to hash file contents")
	}
	return hex.EncodeToString(hasher.Sum(nil)), nil
}
