const aws = require('aws-sdk')
const express = require('express')
const multer = require('multer')
const multerS3 = require('multer-s3')
const config = require('./config/config')
const uuid = require('uuid/v4')
const s3 = new aws.S3

aws.config.update(config.awsConfig)



var upload = multer({
    storage: multerS3({
      s3,
      bucket: process.env.AWS_BUCKET_NAME,
      metadata: function (req, file, cb) {
        cb(null, {fieldName: file.fieldname});
      },
      Key: function (req, file, cb) {
        cb(null, req.sKey)
      }
    })
  })
  const singleFileUpload = upload.single('file');

  function uploadToS3(req,res){
      req.s3Key = uuid();
      let downloadUrl= `https://s3-${config.awsConfig.region}.amazonaws.com.qccc/${req.s3Key}`
      return new Promise((resolve, reject)=>{
          return singleFileUpload(req,res,err=>{
              if(err) return reject(err);
              return resolve(downloadUrl)
          })
      })
  }
module.exports = {
    uploadImageToS3: (req, res) =>{
        uploadToS3(req, res)
        .then(downloadUrl=>{
            console.log(downloadUrl)
           return res.status(200).send ({downloadUrl})

           })
           .catch(e=>{
               console.log(e)
           })
    }
}
