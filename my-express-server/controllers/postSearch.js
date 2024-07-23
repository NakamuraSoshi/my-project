const Post = require('../models/Post');

const searchPosts = (req, res) => {
  const query = req.query.query;
  Post.search(query, (error, results) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ message: '検索に失敗しました' });
    }
    res.status(200).json(results);
  });
};

module.exports = {
  searchPosts
};
