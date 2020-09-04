const db = require('../../models');
const { sequelize } = require('../../models');

module.exports = {
  get: (request, response) => {
    db.Content.findAll({order: sequelize.random(), limit:4})
    .then(randomContents => {
      response.status(200).json(randomContents)
    })
    .catch(error => {
      response.status(404).json({message:"something wrong!", error: error})
    })
  }
}