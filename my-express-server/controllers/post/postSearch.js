const Post = require('../../models/postModel');
const HttpStatus = require('../../config/httpStatus');

const searchPosts = (req, res) => {
  const searchTerm = req.query.searchTerm;
  Post.search(searchTerm, (error, results) => {
    if (error) {
      console.error('検索に失敗しました',error);
      return res.status(HttpStatus.サーバーエラー).json({ message: '検索に失敗しました' });
    }
    res.status(HttpStatus.成功).json(results);
  });
};

module.exports = {
  searchPosts
};
