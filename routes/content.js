const express = require('express');
const router = express.Router();
const authMiddleware = require('../controller/authMiddleware');
const { contentController } = require('../controller');
const upload = require('../controller/imgController');

router.get('/random', contentController.getRandomContent.get);
router.use('/', authMiddleware);
// authMiddleware 에서 토큰 검증 및 redis에서 토큰값 확인이 되지 않으면 next()가 호출되지 않음
// 따라서 아래 라우트들은 로그인 상태인지 확인하는 로직을 넣을 필요가 없다.
router.post('/', upload.array('img'), contentController.postContent.post);
router.post('/detail', contentController.getContentDetail.post);
router.patch('/', upload.array('img'), contentController.patchContent.patch);
router.post('/specific', contentController.getSpecificContents.post);
router.delete('/', contentController.deleteContent.delete);
router.post('/search', contentController.searchContent.post);

module.exports = router;
