const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const { secretKey } = require('../config/authConfig');

// ログイン処理
const loginUser = (req, res) => {
  const { userId, password } = req.body;

  //ユーザーIdをDBから探す
  User.findByUsername(userId, (err, user) => {
    if (err) {
      return res.status(500).json({ message: 'エラーが発生しました' });
    }
    if (!user) {
      return res.status(401).json({ message: 'ユーザー名またはパスワードが無効です' });
    }

    // パスワードの比較
    bcrypt.compare(password, user.password, (err, result) => {
      if (err) {
        return res.status(500).json({ message: 'エラーが発生しました' });
      }
      if (!result) {
        return res.status(401).json({ message: 'ユーザー名またはパスワードが無効です' });
      }

      // JWT トークンの生成
      const token = jwt.sign({ userId: user.userId, username: user.username }, secretKey, {
        expiresIn: '1h' // トークンの有効期限
      });

      // トークンをクライアントに送信
      res.status(200).json({ token });
    });
  });
};

module.exports = { loginUser };
