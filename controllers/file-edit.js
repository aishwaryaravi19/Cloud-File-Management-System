const express = require('express');
const router = express.Router();
const AWS = require("aws-sdk");
const multer = require("multer");
const keys = require("../config/keys");
const Files = require('../models/file');

const storage = multer.memoryStorage();
const edit = multer({storage: storage, limits: {fileSize: 10 * 1024 * 1024}}).single('myImage');

router.post('/', (req, res) => {

  edit(req, res, (err) => {
  const moment = require('moment');    
  //File Upload started
  var startDate = new Date();
  const uname = req.user.name;
  const uemail = req.user.email;
  

  const file = req.file;
  console.log("file", file);

    let s3BucketCredentials = new AWS.S3({
        accessKeyId: keys.AwsAccessKeyId,
        secretAccessKey: keys.AwsSecretAccessKey,
        region: keys.region
    });

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
              fileUrl: data.Location,
              fileName: file.originalname,
              fileDesc: file.originalname,
              cloudfrontKey: data.key,
              uploadTime: ((endDate - startDate) / 1000),
              modifiedDate: ((endDate - startDate) / 1000)
          });
          var myquery = { cloudfrontKey: data.key};
            //Check for file with the given name and edit the record with the given details
            Files.updateOne(myquery, editFile, function(err, res) {
              if (err) throw err;
              console.log("File updated");
            });
        }      
    });
  });

});

module.exports = router;