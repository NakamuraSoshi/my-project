const Like = require('../../models/likeModel');
const HttpStatus = require('../../config/httpStatus');

//いいねを付ける
const giveLike = (req, res) => {
  const { userId, postId } = req.body;
  Like.likePost(userId, postId, (error) => {
    if (error) {
      console.error('いいねに失敗しました',error);
      return res.status(HttpStatus.サーバーエラー).json({ message: 'いいねに失敗しました' });
    }
    res.status(HttpStatus.成功).json({ message: 'いいねしました' });
  });
};

module.exports = {
  giveLike,
};