const Like = require('../../models/likeModel');
const HttpStatus = require('../../config/httpStatus');

//いいねを取り消す
const cancelLike = (req, res) => {
  const { userId, postId } = req.query;
  Like.unlikePost(userId, postId, (error) => {
    if (error) {
      console.error('いいねの解除に失敗しました', error);
      return res.status(HttpStatus.サーバーエラー).json({ message: 'いいねの解除に失敗しました' });
    }
    res.status(HttpStatus.成功).json({ message: 'いいねを取り消しました' });
  });
};
module.exports = {
  cancelLike,
};