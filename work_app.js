var request = require('request-promise');
var redis = require('./redis');
var config = require('./config');

var arrangeStation = function(req, res, next) {
	var hours = new Date().getHours();
	var workStatus;
	var getUrl;
	if (hours < 10) {
		workStatus = 'onWork';
		getUrl = config.bus['68OnRoad']
	} else {
		workStatus = 'offWork';
		getUrl = config.bus['68OffRoad']
	}
	request(getUrl).then(data => {
		if (typeof data === 'string') data = JSON.parse(data);
		return data
	}).then(data => {
		if (data.flag !== 1002) return res.send('无效');
		if (!data || data.length === 0) return res.send([]);
		data = data.data;
		console.log(data)
		var dataLen = data.length;
		var count = 0;
		var temp = [];
		data.forEach(station => {
			redis.getAsync(`/${workStatus}/68/${station.CurrentStation}`).then(reply => {
				if (!reply) {
					// ++count;
					console.log('error! redis no data!', station.CurrentStation, count, dataLen);
				} else {
					station.distance = reply;
					temp.push(station);
					console.log(station.CurrentStation, reply, count, dataLen)
				}
				if (++count === dataLen) {
					req.station = temp;
					next()
				}
			})
		});
	})
}
var getNearestBus = function(req, res, next) {
	console.log(req.station)
	var stations = req.station
	var minDistance = 999;
	var near;
	stations.forEach(station => {
		if (+station.distance < minDistance) {
			minDistance = +station.distance;
			near = station;
		}
	});
	res.send(near)
}
module.exports = {
	arrangeStation,
	getNearestBus
}