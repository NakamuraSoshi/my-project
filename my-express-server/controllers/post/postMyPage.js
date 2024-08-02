const Post = require('../../models/postModel');
const HttpStatus = require('../../config/httpStatus');

const myPost = async (req, res) => {
    const { userId } = req.user;
    
    Post.find(userId, (err, posts ) => {
      if (err) {
        console.log('投稿の取得に失敗しました');
        return res.status(HttpStatus.サーバーエラー).json({ message: 'サーバーエラー:投稿の取得に失敗しました'});
      }

      if (!posts.length) {
        return res.status(HttpStatus.見つかりません).json({ message: '投稿が見つかりませんでした' });
      }
  
      res.status(HttpStatus.成功).json(posts);
    });
  };
  
  module.exports = {
    myPost,
  };