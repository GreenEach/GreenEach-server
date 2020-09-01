const db = require('../../models');

module.exports = {
  post: (request, response) => {
    response.status(200).send(request.decoded.email);
  },
};
