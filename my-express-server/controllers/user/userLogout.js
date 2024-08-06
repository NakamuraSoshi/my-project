const jwt = require('jsonwebtoken');
const { secretKey } = require('../../config/authConfig');
const HttpStatus = require('../../config/httpStatus');

//setオブジェクトでブラックリストを定義
const blacklist = new Set();

// ログアウト処理
const logoutUser = (req, res) => {
  // クッキーからJWTトークンを取得
  const token = req.cookies.token;

  if (!token) {
    return res.status(HttpStatus.認証エラー).json({ message: 'ログアウトに失敗しました' });
  }

  // JWTトークンを検証して、正しいトークンであることを確認
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(HttpStatus.認証エラー).json({ message: 'ログアウトに失敗しました' });
    }

    // トークンをブラックリストに追加する
    blacklist.add(token);

    // ブラックリストに追加したトークンを確認
    console.log('ブラックリスト:', blacklist);

    //削除、クッキーの整合性のために削除時もhttp属性を指定
    res.clearCookie('token', { httpOnly: true, secure: process.env.NODE_ENV === 'production' });

    // トークンを無効化したら、クライアントに対してレスポンスを返す
    res.status(HttpStatus.成功).json({ message: 'ログアウトしました' });
    console.log('ログアウトしました'); // 確認用
  });
};

// ブラックリストにトークンが含まれているかをチェックする関数
const isTokenBlacklisted = (token) => {
  return blacklist.has(token);
};

module.exports = { logoutUser, isTokenBlacklisted };
