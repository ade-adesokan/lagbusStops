var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({extended: false});

var router = express.Router();

var LagosBusStops = require('../models/busStops');

router.route('/')
.get(function(request, response) {
  if(request.query.region) {
    LagosBusStops.find({region: request.query.region}, 'name region -_id', function (err, region) {
      if(err){
        return handleError(err);
      }
      response.json(region);
    });
  }
  else {
    LagosBusStops.find({}, 'name region -_id', function (err, lagBusStops) {
      if(err){
        return handleError(err);
      }
      response.json(lagBusStops);
    });
  }
})

.post(parseUrlencoded, function(request, response) {
  if(request.body.region) {
    LagosBusStops.create({ name: request.body.name, region: request.body.region }, function (err, newItem) {
      if (err) {
        return handleError(err);
      }
      response.json("New item added...");
    });
  }
  else {
    response.status(400).json('Invalid Bus-Stop!');
  }
})

// .put(parseUrlencoded, function(request, response) {
//   if(request.query.region) {
//     var busStopRegion = request.query.region;
//     LagosBusStops.update({region: busStopRegion}, { $set: { region: request.body.region }}, function (err, newUpdate) {
//       if(err){
//         return handleError(err);
//       }
//       response.json(busStopRegion + ' was changed to ' + request.body.region);
//     });
//   } 
//   else {
//     response.status(400).json('Invalid Region!');
//   }
// });

router.route('/:name')
.get(function(request, response) {
  var busStop = request.params.name;
   LagosBusStops.find({name: busStop}, 'name region -_id', function (err, lagBusStop) {
    if(err){
       return handleError(err);
    }
    response.json(lagBusStop);
  });
  // response.status(404).json("Bus-stop not found!");  // Can't resolve this
})

.put(parseUrlencoded, function(request, response) {
  var busStop = request.params.name;

  LagosBusStops.update({name: busStop}, { $set: { name: request.body.name }}, function (err, newUpdate) {
    if(err){
      return handleError(err);
    }
    response.json(busStop + ' was changed to ' + request.body.name);
  });
})

.delete(function(request, response) {
  var busStop = request.params.name;
  LagosBusStops.remove({ name: busStop }, function (err, deleted) {
    if(err) {
      return handleError(err);
    }
    response.json('deleted ' + busStop);
  });
});





module.exports = router;
