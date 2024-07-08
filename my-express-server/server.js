//expressアプリのルーティングとボディパーサー
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');

//Expressアプリオブジェを作成
const app = express();
//Expressアプリで受信したjson形式のリクエストボディはreq.bodyへ格納
app.use(bodyParser.json());
app.use(cors());
//パスに対してuserRoutesで定義したルーティングを使用する設定
app.use('/api/users', userRoutes);
//アプリを指定したポートで起動
app.listen(3001, () => {
    console.log('Server running on port 3001');
});
