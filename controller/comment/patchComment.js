const db = require('../../models');

module.exports = {
  patch: (request, response) => {
    let requestBody = request.body;
    let reqeustBodyKeys = Object.keys(requestBody);
    let possibleKeys = ['commentId', 'comment'];

    reqeustBodyKeys.forEach((element) => {
      if (possibleKeys.includes(element) === false || typeof requestBody.commentId !== 'number') {
        return response.status(400).json({ message: 'bad request' });
      }
    });


    db.Comment.update({
      comment:request.body.comment
      },
      {where: {id: request.body.commentId}})
    .then(updatedComment => {
      response.status(200).json({message:"comment update success"})
    })
    .catch(error => {
      response.status(400).json({message:"something worng!", error: error})
    })
  }
}