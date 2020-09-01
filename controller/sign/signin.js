const db = require('../../models');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = {
post :(request, response) => {
  let hashedPassword = request.body.password;
  var shasum = crypto.createHmac('sha512', process.env.SALT);
  shasum.update(hashedPassword);
  hashedPassword = shasum.digest('hex');

  db.User.findOne({ where: { email: request.body.email } })
  .then((user) => {
    if (user) {
      if (user.password === hashedPassword) {
        let token = jwt.sign(
          {
            email: request.body.email,
          },
          process.env.TOKEN_KEY
        );

        response.status(200);
        response.cookie('userInfo', token);
        response.json({ message: 'Login Success' });
      } else {
        response
          .status(401)
          .json({ message: 'Unauthorized error, incorrect password' });
      }
    } else {
      response.status(401).json({ message: 'Unauthorized error, incorrect email' });
    }
  });
}
}