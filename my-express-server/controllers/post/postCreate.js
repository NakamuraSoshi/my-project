const Post = require('../../models/postModel');
const HttpStatus = require('../../config/httpStatus');

const createPost = async (req, res) => {
  // req.user から userId を取得
  const { userId } = req.user;
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(HttpStatus.不正なリクエスト).json({ message: 'タイトルと内容は入力必須です' });
  }

  Post.create(title, content, userId, (error, postId) => {
    if (error) {
      console.error('投稿の作成に失敗しました',error);
      return res.status(HttpStatus.サーバーエラー).json({ message: '投稿の作成に失敗しました' });
    }

    res.status(HttpStatus.作成成功).json({ message: '投稿しました', postId });
  });
};

module.exports = {
  createPost,
};
