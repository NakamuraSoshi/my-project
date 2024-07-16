//expressアプリのルーティングとボディパーサーでinputの値を受け取り
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');

//Expressアプリオブジェを作成
const app = express();
const PORT = process.env.PORT || 3001;

//Expressアプリで受信したjson形式のリクエストボディはreq.bodyへ格納
app.use(bodyParser.json());
app.use(cors());

//パスに対してuserRoutesで定義したルーティングを使用する設定
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);

//アプリを指定したポートで起動
app.listen(PORT, () => {
    console.log('Server running on port 3001');
});
