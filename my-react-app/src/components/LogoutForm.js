import React, { useContext, useState } from 'react';
import axios from 'axios';
import SubmitButton from './SubmitButton';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const LogoutForm = () => {
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const { setIsLoggedIn } = useContext(AuthContext);

  const handleLogout = async (event) => {
    event.preventDefault(); 
    try {
      //ローカルストレージからトークン取得
      const token = localStorage.getItem('token'); 
      if(!token) {
        console.error('トークンが存在しません');//確認用
        return;
      }
      console.log('送信トークン:', token);//確認用
      //取得したトークンを使用し、サーバーにログアウトリクエスト
      const response = await axios.post(
        'http://localhost:3001/api/users/logout',
        {},
        {
          //ヘッダーにトークンを設定し、Bearerスキームで送信
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      //ログアウトできるとトークン削除
      setMessage(response.data.message); 
      localStorage.removeItem('token'); 
      setIsLoggedIn(false);
      console.log('ログアウトしました'); //確認用
      navigate('/');
    } catch (error) {
      console.error('ログアウト時にエラーが発生しました', error);
      localStorage.removeItem('token'); 
      navigate('/');
    }
  };

  return (
    <div>
      <h2>ログアウト</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleLogout}>
        <SubmitButton text="ログアウト" />
      </form>
    </div>
  );
};

export default LogoutForm;
