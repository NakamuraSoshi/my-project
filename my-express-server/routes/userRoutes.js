//エンドポイントの定義

//expressオブジェクトを生成
const express = require('express');

//express.Routerを呼び出してルーターオブジェクトを作成し、代入
const router = express.Router();

//requireでそれぞれのコントローラー関数を読み込み
const { registerUser } = require('../controllers/user/userRegister.js');
const { loginUser } = require('../controllers/user/userLogin.js');
const { logoutUser } = require('../controllers/user/userLogout.js');
const verifyToken  = require('../middleware/authJwt.js');
const { deleteUser } = require('../controllers/user/userDelete.js');
const { infoUser } = require('../controllers/user/userInfo.js');
const { checkUser } = require('../controllers/user/userCheck');

//ルーティングを設定、パスにリクエストが送信されると関数を実行
router.put('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', verifyToken, logoutUser);
router.delete('/delete', verifyToken, deleteUser);
router.get('/info', verifyToken, infoUser);
router.checkout('/check', verifyToken, checkUser);

module.exports = router;
