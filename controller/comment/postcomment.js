const db = require('../../models');

module.exports = {
  post: (request, response) => {
    // 6~21번줄은 테스트 단계에서만 사용하고 이후 프론트에서 처리하면 될 듯 합니다.
    let requestBody = request.body;
    let reqeustBodyKeys = Object.keys(requestBody);
    let neccessaryKeys = ["photo_url", "comment"]
    
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
      photo_url:request.body.photo_url,
      comment:request.body.comment
    }).then(comment=>{
      if(comment){
        response.status(200).json({id:comment.id})
      } else {
        response.status(400).json({message:"bad request"})
      }
    })
  }
}