import express from 'express';
import config from './config';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userRoute from './routes/userRoute';
import productRoute from './routes/productRoute';
import bodyParser from 'body-parser';
import cors from 'cors';
dotenv.config();

const mongodbUrl = config.MONGODB_URL;

mongoose
  .connect(mongodbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log('mongo databse connected...');
    const port = config.PORT;
    const app = express();
    app.use(cors());
    app.use(bodyParser.json());
    app.use('/api/users', userRoute);
    app.use('/api/products', productRoute);

    app.listen(port, console.log(`server is running on port ${port}`));
  })
  .catch((error) => console.log(error.reason));
