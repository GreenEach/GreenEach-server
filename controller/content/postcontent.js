const db = require('../../models');

module.exports = {
  post: (request, response) => {
    // 배열안에 여러 객체가 있고, 객체 안에 location키에 url이 있음.
    // 모든 정보의 url을 배열에 넣고, stringify해서 저장해야함
    let urlString;

    if(request.files){
      if (request.files.length > 0) {
        let urlArr = [];
        request.files.forEach((file) => urlArr.push(file.location));
        urlString = JSON.stringify(urlArr);
      } else {
        return response.status(400).json({ message: 'bad request' });
      }
    } else {
      return response.status(400).json({ message: 'bad request' });
    }
    
    // 아래는 클라이언트가 요청이 적절한지 확인하는 로직
    let requestBody = request.body;
    let reqeustBodyKeys = Object.keys(requestBody);
    let neccessaryKeys = ['title', 'content', 'level', 'season'];

    neccessaryKeys.forEach((element) => {
      if (reqeustBodyKeys.includes(element) === false) {
        return response.status(400).json({ message: 'bad request' });
      }
    });

    for (let key in requestBody) {
      if (requestBody[key] === '') {
        return response.status(400).json({ message: 'bad request' });
      }
    }

    if (!['easy', 'normal', 'hard'].includes(request.body.level)) {
      return response.status(400).json({ message: 'bad request' });
    } else if (
      !['spring', 'summer', 'fall', 'winter', 'any'].includes(
        request.body.season
      )
    ) {
      return response.status(400).json({ message: 'bad request' });
    }

    db.Content.create({
      title: request.body.title,
      content: request.body.content,
      level: request.body.level,
      season: request.body.season,
      photoUrl: urlString,
      userId: request.decoded.id,
    }).then((post) => {
      if (post) {
        response.status(200).json({ id: post.id, urls: urlString });
      } else {
        response.status(400).json({ message: 'bad request' });
      }
    });
  },
};
