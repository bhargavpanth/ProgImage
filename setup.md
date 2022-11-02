Requirements
* Docker
* AWS CLI

Export the following to set up localstack
* export LOCALSTACK_HOST="localhost"
* export AWS_DEFAULT_REGION="us-east-1"
* export AWS_SECRET_ACCESS_KEY="test"
* export AWS_ACCESS_KEY_ID="test"

Running the containers
* From the root folder, run `docker compose up`
* Once the dependencies spin up, you can spin up the individual services from `image_processing` and `progimage_api`
* To spin up the ProgImage API and Image processing micro service, run the commands mentioned in the `setup.md` files in each of the folders
* Create the `prog-image` bucket via the CLI `awslocal s3api create-bucket --bucket sample-bucket`
* 

