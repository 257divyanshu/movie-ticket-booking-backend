const express = require('express');
const bodyParser = require('body-parser');
const env = require('dotenv');
const mongoose = require('mongoose');

const MovieRoutes = require('./routes/movie.routes');

env.config();
const app = express(); // express() returns an express application object

// configuring body parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

MovieRoutes(app); // invoking movie routes

app.get('/home', (req, res) => {
    console.log("Hitting /home");
    return res.json({
        success: true,
        message: 'Fetched home'
    });
});

app.listen(process.env.PORT, async () => {
    // this callback gets executed, once we successfully start the server on the given port
    console.log(`Server started on Port ${process.env.PORT}`);

    try {
        await mongoose.connect(process.env.DB_URL); // connect to the mongodb server
        console.log("Successfully connected to mongodb");
    } catch (err) {
        console.log("Not able to connect to mongodb", err);
    }
});