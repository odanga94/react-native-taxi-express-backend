const express = require('express');
const mongoose = require('mongoose');
const logger = require('morgan');
const errorhandler = require('errorhandler');
const bodyParser = require('body-parser');
const userRouter = require('./routes/users');
const mongoDbConnectionString = require('./config/mongodb');
const PORT = 4000;
const app = express();

app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/users', userRouter);


mongoose.connect(mongoDbConnectionString, { useNewUrlParser: true }).then(result => {
    console.log('Connected to mongodb');
    app.listen(PORT, () => {
        console.log('Server is listening on PORT: ' + PORT);
    });
}).catch(err => {
    console.error(err);
});


