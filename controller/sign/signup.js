const db = require('../../models');
const crypto = require('crypto');
require('dotenv').config();

module.exports = {
  post:(request, response) => {

    let requestBody = request.body;
    let reqeustBodyKeys = Object.keys(requestBody);
    let neccessaryKeys = ["username", "email", "password"]
    
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

    let password = request.body.password
    var shasum = crypto.createHmac('sha512', process.env.SALT);
    shasum.update(password);
    password = shasum.digest('hex');
    
    db.User.findOrCreate({
      where:{email:request.body.email},
      defaults:{
        username:request.body.username,
        password:password
      }
    })
    .then(([result, created]) => {
      if(!created){
        return response.status(409).json({message:'signup fail, Already exists user'});
      }
      response.status(200).json({id:result.id})
    })
    .catch(error => {
      console.log(error);
      response.sendStatus(500);
    })
  }
}