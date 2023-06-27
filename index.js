//create express application
const express = require('express');
const app = express();
//require dotenv
require('dotenv').config();
//require cors
const cors = require('cors');
//require helmet
const helmet = require('helmet');
//require cookie-parser
const cookieParser = require('cookie-parser');
//require routers
const userRouter = require('./routers/user_router');
const photoRouter = require('./routers/photo_router');
const commentRouter = require('./routers/comment_router');
//require logger
const logger = require('morgan');

const env = process.env.NODE_ENV || 'development';
const config = require('./config/config.js')[env];

const PORT = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(helmet());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser( {
      httpOnly: true,
      secure: false,
      sameSite: 'none',
      maxAge: 6 * 60 * 60 * 1000,
}));

//routers
app.use('/users', userRouter);
app.use('/photos', photoRouter);
app.use('/comments', commentRouter);

app.get('/', (req, res) => {
      res.send({ message: 'Welcome to the Photo App API' });
});


app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
});