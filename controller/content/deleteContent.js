const db = require('../../models');

module.exports = {
  delete: (request, response) => {

  if(!request.body.contentId && typeof request.body.contentId !== "number"){
    return response.status(400).json({messgae:"bad request"})
  }

  db.Content.destroy({
    where: {id:request.body.contentId}
  })
  .then(result => {
    response.status(200).json({message:"content deleted"})
  })
  .catch(error =>
    response.status(400).json({messgae:"something wrong!", error: error}))
  }
}