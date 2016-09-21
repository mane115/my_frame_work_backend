var config = {
	port: 3002,
	redis: {
		port: 6379,
		host: '127.0.0.1'
	},
	bus: {
		'68OnRoad': 'http://www.zhbuswx.com/Handlers/BusQuery.ashx?handlerName=GetBusListOnRoad&lineName=68%E8%B7%AF&fromStation=%E9%87%91%E9%BC%8E%E6%80%BB%E7%AB%99&_=1',
		'68OffRoad':"http://www.zhbuswx.com/Handlers/BusQuery.ashx?handlerName=GetBusListOnRoad&lineName=68%E8%B7%AF&fromStation=%E7%BF%A0%E8%8A%B1%E8%8B%91&_=1474446152435"
	}
}
module.exports = config