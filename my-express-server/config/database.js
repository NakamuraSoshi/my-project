// データベース接続設定
//mysql2というNode.sjのモジュールを読み込み
const mysql = require('mysql2');

//接続作成
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'mydatabase'
})

//接続を確立、エラーならスロー、成功でコンソール出力
db.connect(err =>{
  if(err) throw err;
  console.log('Connected');
});

//モジュールとしてエクスポートすると他ファイルでインポートして接続できる
module.exports = db;