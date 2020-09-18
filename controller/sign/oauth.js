const db = require('../../models');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const redis = require('redis');
const redisClient = redis.createClient();

module.exports = {
  post: (request, response) => {
    let password = request.body.password
    var shasum = crypto.createHmac('sha512', process.env.SALT);
    shasum.update(password);
    password = shasum.digest('hex');

    db.User.findOrCreate({
      where:{email:request.body.email},
      defaults:{
        username:request.body.username,
        password:password
      }
    })
    .then(([result, created]) => {
        let token = jwt.sign(
          {
            email: request.body.email,
            id: result.id,
          },
          process.env.TOKEN_KEY
        );
        //redis에 사용자의 email을 키로, 토큰을 value로 저장한다.
        redisClient.set(request.body.email, token);

        response.status(200).json({ token: token, email: request.body.email });
    })
    .catch(error => {
      console.log(error);
      response.sendStatus(500);
    })
  }
}