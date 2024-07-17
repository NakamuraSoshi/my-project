//トークン認証を行う
const jwt = require('jsonwebtoken');
const { secretKey } = require('../config/authConfig');
const { isTokenBlacklisted } = require('../controllers/userLogout');

//verifyToken関数でトークンの検証,req.headerからトークン取得
const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'トークンが提供されていません' });
  }

  // ブラックリストにトークンが含まれているかをチェック
  if (isTokenBlacklisted(token)) {
    console.log('ブラックリストにあるトークンです'); //確認用
    return res.status(403).json({ message: 'トークンが無効です' });
  }

  //jwtの検証、secretkeyで署名を検証、正当ならuserをreqへ
  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      console.log('トークンが無効です'); //確認用
      return res.status(403).json({ message: 'トークンが無効です' });
    }
    req.user = user;

    //次のルートへ
    next();
  });
};

module.exports = verifyToken;
