const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

var whitelist = ['http://localhost:3000', 'http://testdomain.de' /** other domains if any */];

const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error(`${origin}: Not allowed by CORS`));
    }
  },
  methods: 'GET,HEAD,POST,PATCH,DELETE,OPTIONS',
  credentials: true, // required to pass
  allowedHeaders: 'Content-Type,Authorization,X-Requested-With',
  exposedHeaders: ['set-cookie'],
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

const userRouter = require('./routes/user');
const projectRouter = require('./routes/project');
const blogRouter = require('./routes/blog');

app.use('/api/user', userRouter);
app.use('/api/project', projectRouter);
app.use('/api/blog', blogRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
