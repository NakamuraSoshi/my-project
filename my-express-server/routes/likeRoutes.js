//エンドポイントの定義

//expressオブジェクトを生成
const express = require('express');

//express.Routerを呼び出してルーターオブジェクトを作成し、代入
const router = express.Router();

//requireでそれぞれのコントローラー関数を読み込み
const { giveLike } = require('../controllers/like/likeGive');
const { getLikeStatusAndCount } = require('../controllers/like/likeGetStatusAndCount');
const { cancelLike } = require('../controllers/like/likeCancel');
const verifyToken = require('../middleware/authJwt');

//ルーティングを設定、パスにリクエストが送信されると関数を実行
router.post('/like',verifyToken, giveLike);
router.get('/status',verifyToken, getLikeStatusAndCount);
router.delete('/unlike', verifyToken, cancelLike);

module.exports = router;
