//エンドポイントの定義

//expressオブジェクトを生成
const express = require('express');

//express.Routerを呼び出してルーターオブジェクトを作成し、代入
const router = express.Router();

//requireでそれぞれのコントローラー関数を読み込み
const { likePost, checkLikeStatus, getLikeCount } = require('../controllers/likes');
const verifyToken = require('../middleware/authJwt');

//ルーティングを設定、パスにリクエストが送信されると関数を実行
router.post('/like',verifyToken, likePost);
router.get('/check',verifyToken, checkLikeStatus);
router.get('/count',verifyToken, getLikeCount);

module.exports = router;
