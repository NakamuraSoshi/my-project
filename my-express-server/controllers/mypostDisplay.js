const Post = require('../models/Post');

const myPost = async (req, res) => {
  try {
    const { userId } = req.user;
    
    Post.find(userId, (err, posts ) => {
      if (err) {
        console.log('投稿の取得に失敗しました');//確認用
        return res.status(500).json({ message: 'サーバーエラー:投稿の取得に失敗しました'});
      }

      if(!posts.length) {
        return res.status(404).json({message:'投稿が見つかりませんでした'});
      }

      res.status(200).json(posts);
    });
  }catch (error){
    console.error('投稿の取得に失敗しました');
    res.status(500).json({ message: 'サーバーエラー:投稿の取得に失敗しました'});
  }
};

module.exports = {
  myPost,
}