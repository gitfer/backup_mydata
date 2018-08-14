# backup_mydata
===============

Backs up my data on AWS S3

### Usage

1. Create a 's3settings.json' file just like the following:

  ```sh
{
	"region": "eu-west-1",
	"signatureVersion": "v4",
	"accessKeyId": "<accessKeyId>",
	"secretAccessKey": "<secretAccessKey>",
	"bucketName": "<bucketName>"
}
  ```
2. In order to show the available options, run:

	```sh
  	node.exe index.js -u my_data
  	```
