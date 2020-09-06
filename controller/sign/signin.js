const db = require('../../models');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const redis = require('redis');
const redisClient = redis.createClient();

module.exports = {
  post: (request, response) => {
    let hashedPassword = request.body.password;
    var shasum = crypto.createHmac('sha512', process.env.SALT);
    shasum.update(hashedPassword);
    hashedPassword = shasum.digest('hex');

    db.User.findOne({ where: { email: request.body.email } }).then((user) => {
      if (user) {
        if (user.password === hashedPassword) {
          let token = jwt.sign(
            {
              email: request.body.email,
              id: user.id,
            },
            process.env.TOKEN_KEY
          );
          //redis에 사용자의 email을 키로, 토큰을 value로 저장한다.
          redisClient.set(request.body.email, token);

          response.status(200);
          // response.cookie('userInfo', token, {
          //   maxAge: 1000 * 60 * 60 * 24,
          //   httpOnly:true
          // });
          response.json({ token: token });
          // response.json({ message: 'Login Success' });
        } else {
          response
            .status(401)
            .json({ message: 'Unauthorized error, incorrect password' });
        }
      } else {
        response
          .status(401)
          .json({ message: 'Unauthorized error, incorrect email' });
      }
    });
  },
};
