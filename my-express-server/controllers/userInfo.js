const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const { secretKey } = require('../config/authConfig');

// 認証済みのユーザー情報を返す
const infoUser =  (req, res) => {
  try {
    // リクエストから認証されたユーザー情報を取得
    const {userId} = req.user;
    const {username} = req.user;

    console.log('リクエストユーザーID:', userId);//確認用
    console.log('リクエストユーザーネーム:', username);//確認用

    // ユーザー情報を返す
    res.status(200).json({ userId, username});
  } catch (error) {
    console.error('ユーザー情報の取得に失敗しました', error);
    res.status(500).json({ message: 'サーバーエラー：ユーザー情報の取得に失敗しました' });
  }
};

module.exports = { infoUser };