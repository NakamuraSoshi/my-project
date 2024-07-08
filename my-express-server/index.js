//Expressアプリを設定してSequelizeでDb接続を行う

const express = require('express');
const app = express();
const port = 3001;

const sequelize = require('./config/database');
const userRoutes = require('./routes/userRoutes');

//受信したリクエストをjson形式で解析するreq.bodyとして使用可能に
//userRouterをAPIルートに登録
app.use(express.json());
app.use('/api', userRoutes);

//sequelizeメソッドでモデルとDBを同期、コールバック関数の指定
sequelize.sync()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch(err => {
    console.error('データベースに接続できませんでした:', err);
  });
