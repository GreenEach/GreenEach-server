const db = require('../../models');

module.exports = {
  post: (request, response) => {

    let requestBody = request.body;
    let reqeustBodyKeys = Object.keys(requestBody);
    let neccessaryKeys = ["contentId"]
    
    neccessaryKeys.forEach(element => {
      if(reqeustBodyKeys.includes(element) === false){
        return response.status(400).json({message:"bad request"})
      }
    })
    
    for(let key in requestBody){
      if(requestBody[key] === '' || typeof requestBody[key] !== "number"){
        return response.status(400).json({message:"bad request"})
      }
    }

    db.Content.findAll({
      where:{id: request.body.contentId},
      attributes:["id", "title", "content", "level", "season", "photoUrl", "createdAt", "updatedAt"],
      include:[
        {model: db.User, attributes: ["username", "email"]},
        {model: db.Comment,
         attributes: ["id", "comment", "photoUrl", "createdAt"],
         include: [{model: db.User, attributes: ["username", "email"]}] 
        },
      ]
    }).then(contentDetail => {
      response.status(200).json(contentDetail);
    })
  }
}