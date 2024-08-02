const Like = require('../../models/likeModel');
const HttpStatus = require('../../config/httpStatus');

// いいねの状態と数を取得するAPI
const getLikeStatusAndCount = (req, res) => {
  const { userId, postId } = req.query;

  Like.isLikedByUser(userId, postId, (error, liked) => {
    if (error) {
      console.error('いいねの状態確認に失敗しました', error);
      return res.status(HttpStatus.サーバーエラー).json({ message: 'いいね状態の確認に失敗しました' });
    }

    Like.countLikes(postId, (error, likeCount) => {
      if (error) {
        console.error('いいね数の取得に失敗しました', error);
        return res.status(HttpStatus.サーバーエラー).json({ message: 'いいね数の取得に失敗しました' });
      }

      res.status(HttpStatus.成功).json({ liked, likeCount });
    });
  });
};

module.exports = {
  getLikeStatusAndCount,
};
