const db = require('../../models');

module.exports = {
  post: (request, response) => {

    let requestBody = request.body;
    let reqeustBodyKeys = Object.keys(requestBody);
    let neccessaryKeys = ["title", "content", "level", "season", "category", "photo_url"]
    
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

    db.Content.create({
      title:request.body.title,
      content:request.body.content,
      level:request.body.level,
      season:request.body.season,
      category:request.body.category,
      photo_url:request.body.photo_url
    }).then(post => {
      if(post){
        response.status(200).json({id:post.id})
      } else {
        response.status(400).json({message:"bad request"})
      }
    })
  },
};
