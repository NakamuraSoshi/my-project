const db = require('../config/database');

const Like = {
  //いいね追加メソッド
  likePost: (userId, postId, callback) => {
    const query = 'INSERT INTO likes (userId, postId) VALUES (?, ?)';
    db.query(query, [userId, postId], (err, result) => {
      if(err) {
        return callback(err);
      }
      callback(null, result);
    });
  },

  //いいね削除
  unlikePost: (userId, postId, callback) => {
    const query = 'DELETE FROM likes WHERE userId = ? AND postId = ?';
    db.query(query, [userId, postId], (err, result) => {
      if (err) {
        return callback(err);
      }
      callback(null, result);
    });
  },

  //いいね数取得
  countLikes: (postId, callback) => {
    const query = 'SELECT COUNT(*) as likeCount FROM likes WHERE postId = ?';
    db.query(query, [postId],(err, results) =>{
      if(err) {
        return callback(err);
      }
      callback(null, results[0].likeCount);
    });
  },

  //ユーザーがいいねしているか確認
  isLikedByUser: (userId, postId, callback) => {
    const query = 'SELECT COUNT(*) as liked FROM likes WHERE userId = ? AND postId = ?';
    db.query(query, [userId, postId], (err, results) => {
      if (err) {
        return callback(err);
      }
      callback(null, results[0].liked > 0);
    });
  }
};

module.exports = Like;