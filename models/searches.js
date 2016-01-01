var mongoose = require('mongoose');
var Searches = new mongoose.Schema({
  latest: Array
});
module.exports = mongoose.model('Searches', Searches);
