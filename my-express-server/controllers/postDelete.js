const Post = require('../models/Post');

const deletePost = (req, res) => {
  const { userId } = req.user;
  const { postId } = req.body;

  if (!postId) {
    return res.status(400).json({ message: '投稿IDが見つかりません' });
  }

  Post.delete(postId, userId, (error, affectedRows) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ message: '削除に失敗しました' });
    }

    if (affectedRows > 0) {
      res.status(200).json({ message: '投稿を削除しました' });
    } else {
      res.status(404).json({ message: '投稿が見つかりません' });
    }
  });
};

module.exports = {
  deletePost,
};