const Post = require('../models/Post');

const getPosts = async (req, res) => {
  try {
    const posts = await Post.getAll(); 
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: '記事の取得に失敗しました' });
  }
};

module.exports = {
  getPosts,
};
