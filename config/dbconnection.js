const mongoose = require('mongoose');
require('dotenv').config();

// Map global promises
mongoose.Promise = global.Promise;
// Mongoose Connect
const connectionString = process.env.MONGO_URI;

mongoose.connect(connectionString, {
        useNewUrlParser: true
    })
    .then(function () {
        console.log("MongoDB Connected");
    })
    .catch(function (err) {
        console.log(err);
    });