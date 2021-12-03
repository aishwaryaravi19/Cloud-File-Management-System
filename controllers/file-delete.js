const express = require('express');
const router = express.Router();
const AWS = require("aws-sdk");
const keys = require("../config/keys");
const Files = require('../domains/files');

router.post('/', (req, res) => {

    var cloudFrontFileUrl;
    for(var myKey in req.body) {
        cloudFrontFileUrl=myKey;
     }
    var fileName = cloudFrontFileUrl.split('/')[3];

    let s3BucketCredentials = new AWS.S3({
        accessKeyId: keys.AwsAccessKeyId,
        secretAccessKey: keys.AwsSecretAccessKey,
        region: keys.region
    });

    var params = {
        Bucket: keys.bucketName,
        Delete: {
            Objects: [
              {
                Key: fileName 
              },
            ],
          }
    };

    s3BucketCredentials.deleteObjects(params, function(err, data) {
        if (err) {
            res.status(500).json({error: true, Message: err});
        }
        else{
            req.flash('success_msg','File Deleted!');
            res.redirect('/dashboard');

            Files.deleteOne({ fileUrl: cloudFrontFileUrl }, function (err) {
                if (err) {
                    return err;
                }
                else{
                    console.log('File deleted from database');
                }
                
              });
        }      
    });


});

module.exports = router;