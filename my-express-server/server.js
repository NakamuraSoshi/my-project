//expressアプリのルーティングとボディパーサーで値を受け取り
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const likeRoutes = require('./routes/likeRoutes');
const { closeConnection } = require('./config/database');
const cookieParser = require('cookie-parser');
const verifyToken = require('./middleware/authJwt');

//Expressアプリオブジェを作成
const app = express();
const PORT =  3001;

const corsOption = {
    origin: 'http://localhost:3000',
    //リクエストでwithCredentials: trueを使用するため
    credentials: true,
};

//Expressアプリで受信したリクエストはreq.bodyへ格納
app.use(bodyParser.json());
app.use(cors(corsOption));
app.use(cookieParser());


//パスに対してuserRoutesで定義したルーティングを使用する設定
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/likes', likeRoutes);

//アプリを指定したポートで起動
app.listen(PORT, () => {
    console.log('Server running on port 3001');
});

//イベントリスナーを追加してアプリ終了時にDB切断
process.on('SIGINT' ,() => {
    closeConnection();
    process.exit();
});

process.on('SIGTERM', () => {
    closeConnection();
    process.exit();
});

