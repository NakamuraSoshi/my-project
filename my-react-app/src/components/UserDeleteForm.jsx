import React, { useContext, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import BaseURL from '../config/url';

const UserDeleteForm = () => {
  const [message, setMessage] = useState('');
  const { setIsLoggedIn } = useContext(AuthContext);
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  //送信中の状態を追加
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleDelete = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await axios.delete(
        `${BaseURL}/users/delete`,
        {
          withCredentials: true // クッキーを含めてリクエストを送信
        }
      );

      setMessage(response.data.message);
      setIsLoggedIn(false);
      setUser(null);
      navigate('/');
    } catch (error) {
      setMessage('退会処理中にエラーが発生しました。再度お試しください');
    }finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <h2>退会</h2>
      {message && <p>{message}</p>} 
      <form onSubmit={handleDelete}>
      <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? '処理中...' : '退会する'}
        </button>
      </form>
    </div>
  );
};

export default UserDeleteForm;