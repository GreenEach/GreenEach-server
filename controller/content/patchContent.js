const db = require('../../models');

module.exports = {
  patch: (request, response) => {

    let urlString;

    if(request.files){
      if (request.files.length > 0) {
        let urlArr = [];
        request.files.forEach((file) => urlArr.push(file.location));
        urlString = JSON.stringify(urlArr);
      } else {
        return response.status(400).json({ message: 'img key cant be empty' });
      }
    } else {
      return response.status(400).json({ message: 'no img file' });
    }

    let requestBody = request.body;
    let reqeustBodyKeys = Object.keys(requestBody);
    let possibleKeys = ['contentId', 'title', 'content', 'level', 'season', 'photoUrl'];

    reqeustBodyKeys.forEach((element) => {
      if (possibleKeys.includes(element) === false) {
        return response.status(400).json({ message: 'bad request' });
      }
    });
    // request에 들어온 contentId로 해당 게시글을 찾아서 수정한다.
    db.Content.update({
      title:request.body.title,
      content:request.body.content,
      level:request.body.level,
      season:request.body.season,
      photoUrl:urlString
    },
    {where: {id: request.body.contentId}})
    .then(updatedContent => {
      response.status(200).json({message:"update success", contentId: updatedContent.id})
    })
    .catch(error => {
      response.status(400).json({message: "something wrong!", result: error})
    })
  }
}