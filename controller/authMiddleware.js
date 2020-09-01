const jwt = require('jsonwebtoken');
const redis = require('redis');
const redisClient = redis.createClient();
// 1. 토큰이 없으면 에러 메시지를 보낸다
// 2. 토큰 검증이 실패하면 에러 메시지를 보낸다
// 3.1 토큰 검증에 성공하면 redis에 저장되있는 값과 같은지 확인한다
// 3.2 redis에 저장되어 있는 값과 다르다면(로그아웃 했었다면) 인증 에러를 내보낸다.
const authMiddleware = (request, response, next) => {
  const token = request.cookies.userInfo;

  if (!token) {
    return response.status(401).json({
      message: 'Unauthorized error, please login',
    });
  }

  const decodeTokenPromise = new Promise((resolve, reject) => {
    jwt.verify(token, process.env.TOKEN_KEY, (error, decoded) => {
      if (error) {
        reject(error);
      } else {
        resolve(decoded);
      }
    });
  });

  const onError = (error) => {
    response
      .status(401)
      .json({ message: 'Unauthorized error, please login' });
  };

  decodeTokenPromise
    .then((decoded) => {
      // 토큰이 검증되어도 redis에 저장되어 있는 것과 다르다면(로그아웃 했었다면) 인증 에러를 내보내야 한다.
      // 토큰을 디코딩하면 사용자의 email을 알 수 있다.(decoded.email)
      // redis에는 사용자의 email이 key로, 로그인할 때 발급받은 토큰이 value로 저장되어 있다.
      // redis에 있는 데이터 중 decoded.email 키의 value값을 쿠키에 담겨서 넘어온 토큰과 비교한다
      redisClient.get(decoded.email, (error, reply) => {
        if(reply === token){
          request.decoded = decoded; // 로그인 상태라면 다른 컨트롤러에서도 request.decoded를 통해 사용자의 email을 추출해서 사용할 수 있음.
          next();
        } else {
        response.status(401).json({message: 'Unauthorized error, please login' })
        }
    })
  }).catch(onError);
};

module.exports = authMiddleware