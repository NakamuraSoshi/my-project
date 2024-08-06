const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../../models/userModel');
const { secretKey } = require('../../config/authConfig');
const HttpStatus = require('../../config/httpStatus');

// ログイン処理
const loginUser = (req, res) => {
  const { userId, password } = req.body;

  //ユーザーをDBから探す
  User.findByUserId(userId, (err, users) => {
    if (err) {
      return res.status(HttpStatus.サーバーエラー).json({ message: 'エラーが発生しました' });
    }
    if (!users || users.length === 0) {
      return res.status(HttpStatus.認証エラー).json({ message: 'ユーザー名またはパスワードが無効です' });
    }

    const user = users[0];

    // パスワードの比較 compareでパスワードから変換するHash値が分かる
    bcrypt.compare(password, user.password, (err, result) => {
      if (err) {
        return res.status(HttpStatus.サーバーエラー).json({ message: 'エラーが発生しました' });
      }
      if (!result) {
        return res.status(HttpStatus.認証エラー).json({ message: 'ユーザー名またはパスワードが無効です' });
      }

      // JWT トークンの生成 ペイロード情報にIdと名前を含む secretkeyで署名
      const token = jwt.sign({ userId: user.userId, username: user.username }, secretKey, {
        expiresIn: '10m' // トークンの有効期限
        
      });

      // トークンをクッキーに設定
      res.cookie('token', token, {
        httpOnly: true, // クライアントサイドのJavaScriptからアクセス不可
        secure: process.env.NODE_ENV === 'production', // HTTPSでのみ送信
        sameSite: 'strict', // クロスサイトリクエストに対してクッキーを送信しない
        maxAge: 10 * 60 * 1000 // クッキーの有効期限
      });

      // トークンをクライアントに送信
      res.status(HttpStatus.成功).json({ token, user: { userId: user.userId, username: user.username } });
    });
  });
};

module.exports = { loginUser };
