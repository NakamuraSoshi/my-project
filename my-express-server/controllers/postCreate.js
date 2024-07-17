const Post = require('../models/Post');

const createPost = async (req, res) => {
  // req.user から userId を取得
  const { userId } = req.user;
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ message: 'タイトルと内容は入力必須です' });
  }

  Post.create(title, content, userId, (error, postId) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ message: '投稿の作成に失敗しました' });
    }

    res.status(201).json({ message: '投稿しました', postId });
  });
};

module.exports = {
  createPost,
};
