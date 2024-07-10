const User = require('../models/userModel');

//ユーザーの削除
const deleteUser = (req, res) => {
  const { userId } = req.user;

  User.delete(userId, (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'エラーが発生しました' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'ユーザーが見つかりません' });
    }
    res.status(200).json({ message: 'ユーザーを削除しました' });
    console.log('ユーザーを削除しました');//確認用
  });
};

module.exports = { deleteUser };
