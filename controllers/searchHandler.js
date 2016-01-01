// Require models
var Searches = require("../models/searches.js");
var request = require('request');
var Bing = require('node-bing-api')({ accKey: "jkY/o5mmGwmiNAJiEA3WpV+DvXer4IzWIsaXQ6b6TGI" });
var http = require('http');

function SearchHandler () {
	this.getImages = function(req, res) {
		var base_url = "https://www.googleapis.com/customsearch/v1?key=AIzaSyBymXVgKkSBqy102Fumobz0wv1xHYUdhqU&cx=017576662512468239146:omuauf_lfve&searchType=image&imgType=photo&q=";
		var keyword = req.params.keyword;
		var offset = req.query.offset || 0;
		Bing.images(keyword, {skip: offset}, function(error, response, body) {
			if (body) {
				var ret = [];
				for (var img in body.d.results) {
					var img = body.d.results[img];
					ret.push({
						"url": img.MediaUrl,
						"snippet": img.Title,
						"thumbnail": img.Thumbnail.MediaUrl,
						"source": img.SourceUrl,
					});
				}
				Searches.findOneAndUpdate({}, {$push: {"latest": {"query": keyword, "date": new Date()}}}, {safe: true, upsert: true},
			    function(err, model) {
			        if (err) console.log(err);
			    }
				);
			  res.json(ret);
			}
			else res.json({"error": "Try again"});
		});
	}
	this.getLatest = function(req, res) {
		Searches.findOne({}, function(err, result) {
			if (err) res.json({"error": "No searches made"});
			else res.json(result.latest);
		});
		//res.send("To be implemented.");
	}
}
module.exports = SearchHandler;
