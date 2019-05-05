const express = require('express');
const mongoose = require('mongoose');
const logger = require('morgan');
const errorhandler = require('errorhandler');
const bodyParser = require('body-parser');
const User = require('./model/User');
const PORT = 4000;
const app = express();

app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
const mongoDbConnectionString = "mongodb+srv://odanga:test@cluster0-mgais.mongodb.net/test?retryWrites=true";

app.get('/users', (req, res) => {
    res.send('You fetched a user!');
}); 

app.post('/users', async (req, res) => {
    try{
        const user = new User(req.body);
        const result = await user.save();
        res.send(result);
    } catch(err){
        res.status(500).send(err);
    }
});

mongoose.connect(mongoDbConnectionString, { useNewUrlParser: true }).then(result => {
    console.log('Connected to mongodb');
    app.listen(PORT, () => {
        console.log('Server is listening on PORT: ' + PORT);
    });
}).catch(err => {
    console.error(err);
});


