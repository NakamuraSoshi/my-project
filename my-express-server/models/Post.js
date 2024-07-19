const db = require('../config/database');

const Post = {
  //投稿を作成するメソッド
  create: (title, content, userId, callback) => {
    const query = 'INSERT INTO posts (title, content, userId) VALUES (?, ?, ?)';
    db.query(query, [title, content, userId], (err, result) => {
      if (err) {
        return callback(err);
      }

      //console.log(result); 確認用
      if (result && result.insertId) {
        callback(null, result.insertId);
      } else {
        callback(new Error('形式が異なります'));
      }
    });
  },
  //投稿を削除するメソッド
  delete: (postId, userId, callback) => {
    const query = 'DELETE FROM posts WHERE postId = ? AND userId = ?';
    db.query(query, [postId, userId], (err, result) => {
      if (err) {
        return callback(err);
      }

      //確認用
      console.log(result);
      if (result.affectedRows > 0) {
        callback(null, result.affectedRows);
      } else {
        callback(new Error('Post not found or user not authorized'));
      }
    });
  },

  find: (userId, callback) => {
    const query = 'SELECT * FROM posts WHERE userId = ? ORDER BY createdAt DESC';
    db.query(query, [userId], (err, results) => {
      if (err) {
        return callback(err);
      }

      callback(null, results);
    });
  },

  findAll: (callback) => {
    const query = 'SELECT * FROM posts ORDER BY createdAt DESC';
    db.query(query, (err, results) => {
      if(err) {
        return callback(err);
      }
      callback(null, results);
    });
  }
};

module.exports = Post;
