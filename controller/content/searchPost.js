const db = require('../../models');
const sequelize = require('sequelize');
const Op = sequelize.Op;

module.exports = {
  post: (request, response) => {
    let requestBody = request.body;
    let reqeustBodyKeys = Object.keys(requestBody);
    let neccessaryKeys = ['title'];

    neccessaryKeys.forEach((element) => {
      if (reqeustBodyKeys.includes(element) === false) {
        return response.status(400).json({ message: 'bad request' });
      }
    });

    db.Content.findAll({
      where: { title: { [Op.like]: '%' + request.body.title + '%' } },
    })
      .then((contents) => {
        return response.status(200).json({ contents });
      })
      .catch((error) => {
        response
          .status(400)
          .json({ message: 'something wrong!', result: error });
      });
  },
};
