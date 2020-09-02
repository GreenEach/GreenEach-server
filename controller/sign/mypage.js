const db = require('../../models');

module.exports = {
  post: (request, response) => {
    // 토큰을 디코딩해서 얻은 유저의 id를 이용해서 db에서 유저 정보, 게시글, 댓글 정보를 모두 가져와야 한다.
    db.User.findAll({
      include: [
        {
          model: db.Content,
        },
        {
          model: db.Comment,
        },
      ],
      where: { id: request.decoded.id },
      attributes: ['id', 'username', 'email'],
    })
      .then((myContents) => {
        response.status(200).json(myContents);
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
