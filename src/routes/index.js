const router = express.Router();
import express from 'express';
import models from '../database/models/';
import uploadController from '../controllers/uploadController';


  router.get('/', (_, res) => res.send('Welcome to S3 File Uploader Template'));
  router.post('/upload', uploadController.uploadMyFile);
  router.get('/files/',uploadController.getFiles);


export default router;