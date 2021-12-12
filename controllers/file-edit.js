const express = require('express');
const router = express.Router();
const AWS = require("aws-sdk");
const keys = require("../config/keys");
const Files = require('../models/file');

router.post('/', (req, res) => {

    var fileUrl;
    for(var myKey in req.body) {
        fileUrl=myKey;
     }
    var fileName = fileUrl.split('/')[3];

    let s3BucketCredentials = new AWS.S3({
        accessKeyId: keys.AwsAccessKeyId,
        secretAccessKey: keys.AwsSecretAccessKey,
        region: keys.region
    });
    const file = req.file;

    var params = {
      Bucket: keys.bucketName,
      Key: file.fieldname+('-')+Date.now(),
      Body: file.buffer,
      ContentType: file.mimetype,
      ACL: "public-read"
  };

    s3BucketCredentials.putObject(params, function(err, data) {
        if (err) {
            res.status(500).json({error: true, Message: err});
        }
        else{
            req.flash('success_msg','File Updated!');
            res.redirect('/dashboard');
            var endDate   = new Date();
            
            const editFile = new Files({
              user : uname,
              email : uemail,
              fileUrl:data.Location,
              fileName: file.originalname,
              fileDesc: file.originalname,
              uploadTime: ((endDate - startDate) / 1000),
              modifiedDate: ((endDate - startDate) / 1000)
          });
            //Check for file with the given name and edit the record with the given details
            Files.findOne({ fileName:file.originalname })
            .then( (fileName) => {
                editFile.save()
                .then(file => {
                  console.log('File Updated');
              })
              .catch(err=>console.log(err));
            });
        }      
    });


});

module.exports = router;