//エンドポイントの定義

//expressオブジェクトを生成
const express = require('express');

//express.Routerを呼び出してルーターオブジェクトを作成し、代入
const router = express.Router();

//requireでそれぞれのコントローラー関数を読み込み
const { createPost } = require('../controllers/post/postCreate.js');
const { deletePost } = require('../controllers/post/postDelete.js'); 
const verifyToken = require('../middleware/authJwt.js');
const { myPost } = require('../controllers/post/postMyPage.js');
const { allPosts } = require('../controllers/post/postHomePage.js');
const { searchPosts } = require('../controllers/post/postSearch.js');

//ルーティングを設定、パスにリクエストが送信されると関数を実行
router.put('/create',verifyToken, createPost);
router.delete('/delete',verifyToken, deletePost);
router.get('/mypost',verifyToken, myPost);
router.get('/all', allPosts);
router.get('/search', verifyToken, searchPosts);

module.exports = router;
