const Post = require('../../models/postModel');
const HttpStatus = require('../../config/httpStatus');

const allPosts = (req, res) => {
  Post.findAll((error, results) => {
    if(error) {
      console.error('投稿の取得に失敗しました',error);
      return res.status(HttpStatus.サーバーエラー).json({ message: '投稿の取得に失敗しました' });
    }
    res.status(HttpStatus.成功).json(results);
  });
};

module.exports = {
  allPosts,
}