#!/usr/bin/env node
var program = require('commander');
const AWS = require('aws-sdk');
var s3 = require('s3');
var s3settings = require('./s3settings.json');

const awsS3Client = new AWS.S3(s3settings);
const client = s3.createClient({
    s3Client: awsS3Client
});

const upload = function (folder) {
    console.log("Uploading folder " + folder + ' for bucketName ' + s3settings.bucketName);
    var params = {
        localDir: `${folder}`,
        // deleteRemoved: true,
        s3Params: {
            Bucket: s3settings.bucketName,
            Prefix: `${folder}`,
        }
    };
    var uploader = client.uploadDir(params);
    uploader.on('error', function (err) {
        console.error("unable to upload:", err.stack);
    });
    uploader.on('progress', function () {
        console.log("progress", uploader.progressMd5Amount,
            uploader.progressAmount, uploader.progressTotal);
    });
    uploader.on('end', function () {
        console.log("done uploading");
    });
};

program
    .version('1.0.0')
    .usage('[options] <file ...>')
    .option('-u, --upload <folder>', 'A folder', upload)
    .parse(process.argv);

