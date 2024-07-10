const jwt = require('jsonwebtoken');
const { secretKey } = require('../config/authConfig');
//setオブジェクトでブラックリストを定義
const blacklist = new Set();

// ログアウト処理
const logoutUser = (req, res) => {
  // クライアントから送られてきたJWTトークンを取得
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'ログアウトに失敗しました' });
  }

  // JWTトークンを検証して、正しいトークンであることを確認
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'ログアウトに失敗しました' });
    }

    // トークンをブラックリストに追加する
    blacklist.add(token);

    // ブラックリストに追加したトークンを確認
    console.log('ブラックリスト:', blacklist);

    // トークンを無効化したら、クライアントに対してレスポンスを返す
    res.status(200).json({ message: 'ログアウトしました' });
    console.log('ログアウトしました'); // 確認用
  });
};

// ブラックリストにトークンが含まれているかをチェックする関数
const isTokenBlacklisted = (token) => {
  return blacklist.has(token);
};

module.exports = { logoutUser, isTokenBlacklisted };
