const db = require('../../models');
const crypto = require('crypto');
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
  patch: (request, response) => {
    let requestBody = request.body;
    let reqeustBodyKeys = Object.keys(requestBody);
    let optionalKeys = ['username', 'password'];

    reqeustBodyKeys.forEach((element) => {
      if (optionalKeys.includes(element) === false) {
        return response.status(400).json({ message: 'bad request' });
      }
    });
    // 바꾸려는 비밀번호 암호화
    let hashedPassword = request.body.password;
    var shasum = crypto.createHmac('sha512', process.env.SALT);
    shasum.update(hashedPassword);
    hashedPassword = shasum.digest('hex');

    // request에 들어온 id로 유저정보 찾아서 수정한다
    db.User.update(
      {
        username: request.body.username,
        password: hashedPassword,
      },
      {
        where: { id: request.decoded.id },
      }
    )
      .then((updatedUserInfo) => {
        response
          .status(200)
          .json({ message: 'mypage update success', id: updatedUserInfo.id });
      })
      .catch((error) => {
        response.status(500).json({ error: error });
      });
  },
};
