var express = require('express');
var request = require('request-promise');
var bodyParser = require('body-parser');
var config = require('./config');
var workApp = require('./work_app');
var redis = require('./redis');

var app = express();
app.use(bodyParser.json({
	limit: '1mb'
}));


app.listen(config.port, function(err) {
	console.log(`app is running in ${config.port}`)
})
app.get('/work', workApp.arrangeStation, workApp.getNearestBus);
app.use('/test', express.static('test/'));
//test
// var road = require('./68.json');
// road.forEach(station => {
// 	if (station.onWork) {
// 		redis.set(`/onWork/68/${station.Name}`, station.onWork)
// 	}
// 	if (station.offWork) {
// 		redis.set(`/offWork/68/${station.Name}`, station.offWork)
// 	}
// });
//test finish

