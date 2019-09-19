// jshint esversion:6
// require node packages
require("dotenv").config();
const mongoose = require("mongoose");

// Connect to mongodb cloud server using mongoose
mongoose.connect(process.env.DB_HOST + "://" + process.env.DB_USER + ":" + process.env.DB_PASS + "@cluster0-dvn5y.mongodb.net/" + process.env.DB_NAME + "?retryWrites=true/" , { useNewUrlParser: true });
mongoose.set("useCreateIndex", true);

module.exports = mongoose;
