const express = require('express');
const cookieParser = require('cookie-parser');
const userRouter = require('./routes/user');
const projectRouter = require('./routes/project');
const blogRouter = require('./routes/blog');
const { forwardError, throwErrorOnInvalidRoute } = require('./middlewares/errorHandler');
const { initCors } = require('./setUp/initCors');
const { initMongodb } = require('./setUp/initMonogodb');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

initCors(app);
app.use(express.json());
app.use(cookieParser());
initMongodb();

//routes
app.use('/api/user', userRouter);
app.use('/api/project', projectRouter);
app.use('/api/blog', blogRouter);

// implement error middleware
app.all('*', throwErrorOnInvalidRoute);
app.use(forwardError);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
