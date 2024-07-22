import React, { useContext, useState } from 'react';
import axios from 'axios';
import InputField from './InputField';
import SubmitButton from './SubmitButton';
import { Link } from 'react-router-dom';
import '../styles/user.css';
import Snackbar from './Snackbar';
import { AuthContext } from '../contexts/AuthContext';

//useStateで状態管理
const LoginForm = ({ showMessage }) => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const { setIsLoggedIn } = useContext(AuthContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/api/users/login', {
        userId,
        password
      });
      //ログイン成功でサーバーから返されたJWTトークンをローカルストレージに保存
      localStorage.setItem('token', response.data.token);
      setMessage('ログインしました');
      setMessageType('success');
      setIsLoggedIn(true);
      window.location.href = '/';
    } catch (error) {
      setMessage('ログインに失敗しました もう一度お試しください');
      setMessageType('error');
    }
  };

  const handleCloseSnackbar = () => {
    setMessage('');
  }

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
      {message && (
        <Snackbar
          message={message}
          type={messageType}
          onClose={handleCloseSnackbar}
        />
      )}
      <Link to='/'></Link>
    </div>
  );
};

export default LoginForm;