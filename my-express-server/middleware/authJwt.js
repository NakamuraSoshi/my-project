const jwt = require('jsonwebtoken');
const { secretKey } = require('../config/authConfig');
const { isTokenBlacklisted } = require('../controllers/user/userLogout');
const HttpStatus = require('../config/httpStatus');

// verifyToken関数でトークンの検証
const verifyToken = (req, res, next) => {
  // クッキーからトークンを取得
  const token = req.cookies.token;

  if (!token) {
    return res.status(HttpStatus.認証エラー).json({ message: 'トークンが提供されていません' });
  }

  // ブラックリストにトークンが含まれているかをチェック
  if (isTokenBlacklisted(token)) {
    console.log('ブラックリストにあるトークンです'); // 確認用
    return res.status(HttpStatus.権限がありません).json({ message: 'トークンが無効です' });
  }

  // jwtの検証、secretKeyで署名を検証、正当ならuserをreqへ
  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      console.log('トークンが無効です'); // 確認用
      return res.status(HttpStatus.権限がありません).json({ message: 'トークンが無効です' });
    }
    req.user = user;

    // 次のミドルウェアまたはルートハンドラへ
    next();
  });
};

module.exports = verifyToken;

