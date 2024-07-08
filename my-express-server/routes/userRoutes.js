//エンドポイントの定義

//expressフレームワークをrequire関数で読み込み代入
const express = require('express');

//express.Routerw呼び出してルーターオブジェクトを作成し、代入
const router = express.Router();

//register関数をrequireで読み込み
const { registerUser } = require('../controllers/userRegister');

//post()メソッドでHTTP POSTメソッドを受け付けるルーティングを設定、'/register'パスに送信されると関数を実行
router.post('/register', registerUser);

module.exports = router;
