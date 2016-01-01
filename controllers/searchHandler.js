// Require models
//var Current = require("../models/current.js");
var http = require('http');

function SearchHandler () {
	this.getImages = function(req, res) {
		res.send("Hello World!");
	}
}
module.exports = SearchHandler;
