require('dotenv').config();

import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';
import cors from 'cors';
import userRouter from './routes/user';
import projectRouter from './routes/project';
import blogRouter from './routes/blog';
import imageRouter from './routes/image';
import categoryRouter from './routes/category';
import { forwardError, throwErrorOnInvalidRoute } from './middlewares/errorHandler';
import { createCorsOption } from './setUp/initCors';
import { initMongodb } from './setUp/initMongodb';
import logger from './setUp/initLogger';

const app = express();
const port = process.env.PORT || 5000;

app.use(cors(createCorsOption()));
app.use(express.json());
app.use(cookieParser());
app.use(fileUpload({ createParentPath: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
initMongodb();

// routes
app.use('/api/user', userRouter);
app.use('/api/project', projectRouter);
app.use('/api/blog', blogRouter);
app.use('/api/image', imageRouter);
app.use('/api/category', categoryRouter);

// implement error middleware
app.all('*', throwErrorOnInvalidRoute);
app.use(forwardError);

app.listen(port, () => {
  logger.info(`Server is running on port: ${port}`);
});

module.exports = app;
