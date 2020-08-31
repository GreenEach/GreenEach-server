const db = require('../../models');
const crypto = require('crypto');
require('dotenv').config();

module.exports = {
  post:(request, response) => {
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