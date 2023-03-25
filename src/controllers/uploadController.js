const db = require('../database/models/');
const dotenv = require('dotenv');
const aws = require('aws-sdk');
dotenv.config();

const { File } = db;

const s3 = new aws.S3({
accessKeyId: process.env.AWS_ACCESS_ID,
secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

class uploadController {

//method to upload file and insert in the DB
static async uploadMyFile(req, res) {
  if (!req.file) {
    return res.send('Please upload a file');
  }
  
  try {
  
    // Upload file to S3
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: req.file.originalname,
      Body: req.file.buffer,
      ContentType: req.file.mimetype,
      ACL: 'public-read'
    };
    const data = await s3.upload(params).promise();
  
    // Insert file name and link in DB
    const { originalname: name, mimetype: type, size, path } = req.file;
    const file = await File.create({
      name,
      type,
      size,
      path,
      link: data.Location
    });
  
    // Return success message
    return res.status(200).json({
      message: 'File uploaded successfully',
      data: {
        id: file.id,
        name: file.name,
        type: file.type,
        size: file.size,
        link: file.link
      }
    });
  
  } catch (error) {
    console.log('ERROR', error);
    return res.status('500').json({ errors: { error: 'Files not found', err: error.message } });
  }
  }
  
  //method to return files in the DB
  static async getFiles(req, res) {//Code to get all files from DB and return them
    const files = await File.findAll();
    return res.status(200).json({
      message: 'Files retrieved successfully',
      data: files
    });
    }
    }
    
    module.exports = uploadController;