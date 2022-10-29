package lib
import (
	"net/http"
	"os"
	"io"
	"fmt"
	"math/rand"
	"strconv"
)

func DownloadFile(downloadFrom string, downloadTo string) (err error) {
	// Create the file
	out, err := os.Create(downloadFrom + strconv.Itoa(rand.Intn(1000000)))
	if err != nil  {
		return err
	}
	defer out.Close()

	// // File path
	// in, err := os.Open(downloadTo)
	// println(err.Error())
    // if err != nil {
    //     return err
    // }
    // defer in.Close()

	resp, err := http.Get(downloadTo)
	if err != nil {
		println(err.Error())
		return err
	}
	defer resp.Body.Close()

	// Check server response
	if resp.StatusCode != http.StatusOK {
		return fmt.Errorf("bad status: %s", resp.Status)
	}

	// Writer the body to file
	_, err = io.Copy(out, resp.Body)
	if err != nil  {
		return err
	}

	return nil
}

func UploadFile(uploadFrom string, uploadTo string) (err error) {
	return nil
}

