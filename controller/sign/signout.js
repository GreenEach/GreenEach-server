const redis = require('redis');
const redisClient = redis.createClient();

module.exports = {
  post: (request, response) => {
    redisClient.del(request.decoded.email);
    response.status(200).json({ message: 'signout success' });
  },
};
