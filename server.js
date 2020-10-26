const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const pino = require('pino');
const userRouter = require('./routes/user');
const projectRouter = require('./routes/project');
const blogRouter = require('./routes/blog');
const imageRouter = require('./routes/image');
const { forwardError, throwErrorOnInvalidRoute } = require('./middlewares/errorHandler');
const { initCors } = require('./setUp/initCors');
const { initMongodb } = require('./setUp/initMongodb');

const logger = pino({ level: process.env.LOG_LEVEL || 'info', prettyPrint: true });

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

initCors(app);
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

// implement error middleware
app.all('*', throwErrorOnInvalidRoute);
app.use(forwardError);

app.listen(port, () => {
  logger.info(`Server is running on port: ${port}`);
});
