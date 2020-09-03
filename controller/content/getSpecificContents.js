const db = require('../../models');

module.exports = {
  post: (request, response) => {

    let requestBody = request.body;
    let reqeustBodyKeys = Object.keys(requestBody);
    let neccessaryKeys = ["level", "season", "category"]
    
    neccessaryKeys.forEach(element => {
      if(reqeustBodyKeys.includes(element) === false){
        return response.status(400).json({message:"bad request"})
      }
    })


    db.Content.findAll({
      where:{
        level:request.body.level,
        season:request.body.season,
        category:request.body.category
      }
    })
    .then(specificContents => {
      response.status(200).json(specificContents)
    })
    .catch(error => {
      response.status(404).json({message:"something wrong!", error: error})
    })
  }
}