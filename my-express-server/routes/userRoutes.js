//エンドポイントの定義

//expressオブジェクトを生成
const express = require('express');

//express.Routerを呼び出してルーターオブジェクトを作成し、代入
const router = express.Router();

//requireでそれぞれのコントローラー関数を読み込み
const { registerUser } = require('../controllers/userRegister');
const { loginUser } = require('../controllers/userLogin');
const { logoutUser } = require('../controllers/userLogout');
const verifyToken = require('../middleware/authJwt.js');
const { deleteUser } = require('../controllers/userDelete');

//ルーティングを設定、パスにリクエストが送信されると関数を実行
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', verifyToken, logoutUser);
router.post('/delete', verifyToken, deleteUser);

module.exports = router;
