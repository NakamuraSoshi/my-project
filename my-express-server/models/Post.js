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

  //ユーザーIDから投稿の取得
  find: (userId, callback) => {
    const query = 'SELECT * FROM posts WHERE userId = ? ORDER BY createdAt DESC';
    db.query(query, [userId], (err, results) => {
      if (err) {
        return callback(err);
      }

      callback(null, results);
    });
  },

  //すべての投稿とユーザー名を取得
  findAll: (callback) => {
    const query = `
        SELECT p.postId, p.title, p.content, p.createdAt, u.username
        FROM posts p
        JOIN users u ON p.userId = u.userId
        ORDER BY p.createdAt DESC
    `;
    db.query(query, (err, results) => {
      if(err) {
        return callback(err);
      }
      callback(null, results);
    });
  },

  //postsテーブルのtitleとcontentカラムから部分一致検索
  search: (query, callback) => {
    const sqlQuery = `
      SELECT posts.*, users.username, 
      (SELECT COUNT(*) FROM likes WHERE likes.postId = posts.postId) as likeCount
      FROM posts
      JOIN users ON posts.userId = users.userId
      WHERE posts.title LIKE ? OR posts.content LIKE ?
    `;
    const likeQuery = `%${query}%`;
    db.query(sqlQuery, [likeQuery, likeQuery], (error, results) => {
      if (error) {
        return callback(error);
      }
      callback(null, results);
    });
  }
};

module.exports = Post;