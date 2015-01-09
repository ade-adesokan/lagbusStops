var mongoose = require('mongoose');
mongoose.connect('mongodb://adewunmiadesokan:omodolapo@ds029541.mongolab.com:29541/lagosbusstops');
var db = mongoose.connection;
db.on('error', function (callback) {
  console.log('Did not connect to database !!'); 
});
db.once('open', function (callback) {
  console.log('Connected to database...'); 
});

var schema = new mongoose.Schema({ name: String, region: String });
var LagosBusStops = mongoose.model('LagosBusStop', schema);


module.exports = LagosBusStops;

