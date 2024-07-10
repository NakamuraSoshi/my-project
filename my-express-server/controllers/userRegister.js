//Node.jsでユーザー登録を実行
//bcrycpモジュールでパスワードをハッシュ化
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');

//register関数：req.bodyから情報取得、すべて受け取れなければエラーをレスポンス、json()でjson形式にできる
const registerUser = async (req, res) => {
  const { userId, username, password } = req.body;
  if (!userId || !username || !password) {
      return res.status(400).json({ message: 'ユーザーID、ユーザー名、パスワードすべて入力必須です' });
  }
  try {
    // 10回のソルト付きハッシュ化
    const hashedPassword = await bcrypt.hash(password, 10);

    // User.createを呼び出しユーザーをDBに登録
    User.create(userId, username, hashedPassword, (err, result) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({ message: 'ユーザー登録に失敗しました' });
      }
      // 登録成功時のレスポンス
      res.status(201).json({ message: 'ユーザー登録に成功しました' });
    });
  } catch (error) {
    console.error('Hashing error:', error);
    return res.status(500).json({ message: 'パスワードのハッシュ化に失敗しました' });
  }
};

module.exports = {
  registerUser
};
