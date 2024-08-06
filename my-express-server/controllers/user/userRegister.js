//Node.jsでユーザー登録を実行
//bcrycpモジュールでパスワードをハッシュ化
const bcrypt = require('bcryptjs');
const User = require('../../models/userModel');
const HttpStatus = require('../../config/httpStatus');

//register関数：req.bodyから情報取得、すべて受け取れなければエラーをレスポンス、json()でjson形式にできる
const registerUser = async (req, res) => {
  const { userId, username, password } = req.body;
  if (!userId || !username || !password) {
      return res.status(HttpStatus.不正なリクエスト).json({ message: 'ユーザーID、ユーザー名、パスワードすべて入力必須です' });
  }
  try {
    // 10回のソルト付きハッシュ化
    const hashedPassword = await bcrypt.hash(password, 10);

    // User.createを呼び出しユーザーをDBに登録
    User.create(userId, username, hashedPassword, (err, result) => {
      if (err) {
        console.error('ユーザー登録中にデータベースエラーが発生しました', err);
        return res.status(HttpStatus.サーバーエラー).json({ message: 'ユーザー登録中にデータベースエラーが発生しました' });
      }
      // 登録成功時のレスポンス
      return res.status(HttpStatus.作成成功).json({ message: 'ユーザー登録に成功しました' });
    });
  } catch (error) {
    // パスワードのハッシュ化中にエラーが発生した場合
    console.error('パスワードのハッシュ化に失敗しました' , error);
    return res.status(HttpStatus.サーバーエラー).json({ message: 'パスワードのハッシュ化に失敗しました' });
  }
};

module.exports = {
  registerUser
};