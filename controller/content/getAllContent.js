const db = require('../../models');

module.exports = {
  get: (request, response) => {
    db.Content.findAll()
    .then(allContents => {
      response.status(200).json(allContents)
    })
    .catch(error => {
      response.status(404).json({message:"something wrong!", error: error})
    })
  }
}