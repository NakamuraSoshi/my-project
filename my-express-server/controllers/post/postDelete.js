const Post = require('../../models/postModel');
const HttpStatus = require('../../config/httpStatus');

const deletePost = (req, res) => {
  const { userId } = req.user;
  const { postId } = req.body;

  if (!postId) {
    return res.status(HttpStatus.不正なリクエスト).json({ message: '投稿IDが見つかりません' });
  }

  Post.delete(postId, userId, (error, affectedRows) => {
    if (error) {
      console.error('削除に失敗しました',error);
      return res.status(HttpStatus.サーバーエラー).json({ message: '削除に失敗しました' });
    }

    if (affectedRows > 0) {
      res.status(HttpStatus.成功).json({ message: '投稿を削除しました' });
    } else {
      res.status(HttpStatus.見つかりません).json({ message: '投稿が見つかりません' });
    }
  });
};

module.exports = {
  deletePost,
};