var http = require("http");
var express = require("express");
var mongoose = require("mongoose");
var path = require("path");
var session = require('express-session');
var bodyParser = require('body-parser');
require('dotenv').load();
// Require handler
var SearchHandler = require(path.dirname() + '/controllers/searchHandler.js');
// Init urlHandler
var searchHandler = new SearchHandler();
// Init app
var app = express();
// Get db uri
var uristring = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || process.env.MONGO_URI;

// Connect to db
mongoose.connect(uristring, function (err, res) {
  if (err) console.log ('ERROR connecting to: ' + uristring + '. ' + err);
  else console.log ('Succeeded connected to: ' + uristring);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Default route
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname + "/client/index.html"));
});

// Get keyword route
app.get("/search/:keyword", searchHandler.getImages);
app.get("/latest/searches", searchHandler.getLatest);

// Listen on default port or 8080
app.listen(process.env.PORT || 8080);
