//dbモジュールをインポート
const db = require('../config/database');

//Userオブジェクトを定義、createメソッドで新しいユーザーをDBに登録
const User = {
  create: (userId, username, hashedPassword, callback) =>{
    const query = 'INSERT INTO users(userId, username, password) VALUES (?,?,?)';
    db.query(query, [userId, username,hashedPassword], callback);
  },
  //findByUserNameメソッドでユーザー名の情報を取得
  findByUsername: (username, callback)=>{
    const query = 'SELECT * FROM users WHERE username = ?';
    db.query(query,[username],callback)
  }
};

//Userオブジェをエクスポート
module.exports = User;

