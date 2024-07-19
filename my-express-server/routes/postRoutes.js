//エンドポイントの定義

//expressオブジェクトを生成
const express = require('express');

//express.Routerを呼び出してルーターオブジェクトを作成し、代入
const router = express.Router();

//requireでそれぞれのコントローラー関数を読み込み
const { createPost } = require('../controllers/postCreate');
const { deletePost } = require('../controllers/postDelete'); 
const verifyToken = require('../middleware/authJwt.js');
const { myPost } = require('../controllers/mypostDisplay');
const { allPosts } = require('../controllers/allpostDisplay');

//ルーティングを設定、パスにリクエストが送信されると関数を実行
router.post('/create',verifyToken, createPost);
router.delete('/delete',verifyToken, deletePost);
router.get('/mypost',verifyToken, myPost);
router.get('/all', allPosts);

module.exports = router;
