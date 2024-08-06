//dbモジュールをインポート
const {db} = require('../config/database');

//Userオブジェクトを定義、createメソッドで新しいユーザーをDBに登録
const User = {
  create: (userId, username, hashedPassword, callback) =>{
    const query = 'INSERT INTO users(userId, username, password) VALUES (?,?,?)';
    db.query(query, [userId, username,hashedPassword], callback);
  },
  //findByUserNameメソッドでユーザー名の情報を取得
  findByUsername: (username, callback) => {
    const query = 'SELECT * FROM users WHERE username = ?';
    db.query(query, [username], callback);
  },

  // ユーザーIDでユーザーを検索
  findByUserId: (userId, callback) => {
    const query = 'SELECT * FROM users WHERE userId = ?';
    db.query(query, [userId], callback);
  },

  //ユーザー削除
  delete: (userId, callback) => {
    // トランザクションを開始
    db.beginTransaction(err => {
      if (err) return callback(err);

      // `likes` テーブルから削除
      db.query('DELETE FROM likes WHERE userId = ?', [userId], (error) => {
        if (error) {
          return db.rollback(() => callback(error));
        }

        // `posts` テーブルから削除
        db.query('DELETE FROM posts WHERE userId = ?', [userId], (error) => {
          if (error) {
            return db.rollback(() => callback(error));
          }

          // `users` テーブルから削除
          db.query('DELETE FROM users WHERE userId = ?', [userId], (error) => {
            if (error) {
              return db.rollback(() => callback(error));
            }

            // トランザクションをコミット
            db.commit((err) => {
              if (err) {
                return db.rollback(() => callback(err));
              }
              callback(null, { message: 'ユーザーを削除しました' });
            });
          });
        });
      });
    });
  }
};

module.exports = User;