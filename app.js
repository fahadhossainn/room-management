const express = require('express');
const AppError = require('./utils/appError');
const userRouter = require('./routes/userRoutes');
const roomRouter = require('./routes/roomRoutes');
const globalErrorHandler = require('./controller/errorController');


const app = express();



app.use(express.json());

app.use('/api/users', userRouter);
app.use('/api/rooms', roomRouter);


app.all('*' , (req,res,next) => {
    next(new AppError(`Can't find requested route ${req.originalUrl} in the server ` , 404));
});

app.use(globalErrorHandler);

module.exports = app;