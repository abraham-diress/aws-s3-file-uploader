import express from 'express';
import dotenv from 'dotenv';
import cors from'cors';
import axios from 'axios';
import bodyParser from'body-parser';
import routes from './routes';

dotenv.config();

const app = express();
const port = process.env.PORT || 80;

app.use(cors());
app.use(bodyParser.json({limit: '50mb', extended: true}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true }));


app.use('/api/v1', routes);

var server = app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
  
});