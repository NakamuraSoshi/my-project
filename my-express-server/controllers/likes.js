const Like = require('../models/Like');

const likePost = (req, res) => {
  const { userId, postId } = req.body;
  Like.likePost(userId, postId, (error) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ message: 'いいねに失敗しました' });
    }
    res.status(200).json({ message: 'いいねしました' });
  });
};

const checkLikeStatus = (req, res) => {
  const { userId, postId } = req.query;
  Like.isLikedByUser(userId, postId, (error, liked) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ message: 'いいね状態の確認に失敗しました' });
    }
    res.status(200).json({ liked });
  });
};

const getLikeCount = (req, res) => {
  const { postId } = req.query;
  Like.countLikes(postId, (error, likeCount) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ message: 'いいね数の取得に失敗しました' });
    }
    res.status(200).json({ likeCount });
  });
};

module.exports = {
  likePost,
  checkLikeStatus,
  getLikeCount
};