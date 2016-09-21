var Redis = require('redis');
var Promise = require('bluebird');
var config = require('./config');
var redis = Redis.createClient(config.redis.port, config.redis.host)
Promise.promisifyAll(Redis.RedisClient.prototype);
Promise.promisifyAll(Redis.Multi.prototype);
module.exports = redis;