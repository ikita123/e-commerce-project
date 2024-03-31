import express from 'express';
import  connectDB  from './databases/index'
import router from './routes/index';
import { PORT } from './config/index';
import 'dotenv/config';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

connectDB()
  .then(() => {
    console.log('Database connected');
    
    app.use(router);

    const port = PORT || 5000;
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    // Database connection failed
    console.error(error.message);
    process.exit(1);
  });