const express = require('express');
const bodyParser = require('body-parser');
const env = require('dotenv');
const mongoose = require('mongoose');

env.config();
const app = express(); // express() returns an express application object

// configuring body parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/home', (req, res) => {

    // req is the request object that client will send
    // res is the response object that we will send

    console.log("Hitting /home");
    return res.json({
        success: true,
        message: 'Fetched home'
    });
    // 'return res.json({...})' creates json inside the response object and returns the response object
});

app.listen(process.env.PORT, async () => {
    // this callback gets execcuted, once we successfully start the server on the given port
    console.log(`Server started on Port ${process.env.PORT}`);

    try {
        await mongoose.connect(process.env.DB_URL); // connect to the mongodb server
        console.log("Successfully connected to mongodb server");
    } catch (err) {
        console.log("Not able to connect mongodb server", err);
    }
});