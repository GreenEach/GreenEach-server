const db = require('../../models');

module.exports = {
  post: (request, response) => {
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
    let neccessaryKeys = ["comment", "contentId"]
    
    neccessaryKeys.forEach(element => {
      if(reqeustBodyKeys.includes(element) === false){
        return response.status(400).json({message:"bad request"})
      }
    })
    
    for(let key in requestBody){
      if(requestBody[key] === ''){
        return response.status(400).json({message:"bad request"})
      }
    }
    
    db.Comment.create({
      photoUrl:urlString,
      comment:request.body.comment,
      contentId:request.body.contentId,
      userId:request.decoded.id
    }).then(comment=>{
      if(comment){
        response.status(200).json({id:comment.id})
      } else {
        response.status(400).json({message:"bad request"})
      }
    })
  }
}