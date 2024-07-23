const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const { secretKey } = require('../config/authConfig');

// ログイン処理
const loginUser = (req, res) => {
  const { userId, password } = req.body;

  //ユーザーをDBから探す
  User.findByUserId(userId, (err, users) => {
    if (err) {
      return res.status(500).json({ message: 'エラーが発生しました' });
    }
    if (!users || users.length === 0) {
      return res.status(401).json({ message: 'ユーザー名またはパスワードが無効です' });
    }

    //console.log(users.password); 確認用
    const user = users[0];
    //console.log(user.password); 確認用

    // パスワードの比較 compareでパスワードから変換するHash値が分かる
    bcrypt.compare(password, user.password, (err, result) => {
      if (err) {
        return res.status(500).json({ message: 'エラーが発生しました' });
      }
      if (!result) {
        return res.status(401).json({ message: 'ユーザー名またはパスワードが無効です' });
      }

      // JWT トークンの生成 ペイロード情報にIdと名前を含む secretkeyで署名
      const token = jwt.sign({ userId: user.userId, username: user.username }, secretKey, {
        expiresIn: '10m' // トークンの有効期限
        
      });

      console.log('生成されたトークン:', token);//確認用

      // トークンをクライアントに送信
      res.status(200).json({ token, user: { userId: user.userId, username: user.username } });
    });
  });
};

module.exports = { loginUser };
