import React, { useState } from 'react';
import axios from 'axios';
import InputField from './InputField';
import SubmitButton from './SubmitButton';

//useStateで状態管理
const LoginForm = () => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/api/users/login', {
        userId,
        password
      });
      //ログイン成功でサーバーから返されたJWTトークンをローカルストレージに保存
      setMessage('ログインに成功しました');
       localStorage.setItem('token', response.data.token);
    } catch (error) {
      setMessage('ログインに失敗しました もう一度お試しください');
    }
  };

  return (
    <div>
      <h2>ログイン</h2>
      <form onSubmit={handleSubmit}>
        <InputField
          label="ユーザーID:"
          type="text"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
        <InputField
          label="パスワード:"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <SubmitButton text="ログイン" />
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default LoginForm;