const User = require('../../models/userModel');
const HttpStatus = require('../../config/httpStatus');

//ユーザーの削除
const deleteUser = (req, res) => {
  const { userId } = req.user;

  User.delete(userId, (err, result) => {
    if (err) {
      console.error('データベースエラー:', err);
      return res.status(HttpStatus.サーバーエラー).json({ message: 'エラーが発生しました' });
    }
    if (result.affectedRows === 0) {
      return res.status(HttpStatus.見つかりません).json({ message: 'ユーザーが見つかりません' });
    }
    //クッキー削除
    res.clearCookie('token');
    res.status(HttpStatus.成功).json({ message: 'ユーザーを削除しました' });
    console.log('ユーザーを削除しました');//確認用
  });
};

module.exports = { deleteUser };
