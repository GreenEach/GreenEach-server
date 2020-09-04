const db = require('../../models');

module.exports = {
  delete: (request, response) => {

    if(!request.body.commentId && typeof request.body.commentId !== "number"){
      return response.status(400).json({messgae:"bad request"})
    }

    db.Comment.destroy({
      where: {id:request.body.commentId}
    })
    .then(result => {
      response.status(200).json({message:"comment delete success"})
    })
    .catch(error => {
      response.status(400).json({message:"something wrong!", error: error})
    })
  }
}