const Post = require('../models/Post');

const allPosts = (req, res) => {
  Post.findAll((error, results) => {
    if(error) {
      console.error(error);
      return res.status(500).json({ message: '投稿の取得に失敗しました' });
    }
    res.status(200).json(results);
  });
};

module.exports = {
  allPosts,
}