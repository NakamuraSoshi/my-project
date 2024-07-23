import React, { useContext, useState } from 'react';
import axios from 'axios';
import SubmitButton from './SubmitButton';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';


const UserDeleteForm = () => {
  const [message, setMessage] = useState('');
  const { setIsLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleDelete = async (event) => {
    event.preventDefault();

    try{
      const token = localStorage.getItem('token');
      if(!token) {
        console.error('トークンがありません');
        return;
      }

      const response = await axios.post(
        'http://localhost:3001/api/users/delete',
        {},
        {
          headers: {
            'Authorization': `Bearer ${token}` 
          }
        }
      );

      setMessage(response.data.message);
      localStorage.removeItem('token');
      setIsLoggedIn(false);
      navigate('/');
    } catch (error) {
      console.error('退会処理中にエラーが発生しました', error);
      localStorage.removeItem('token'); 
      setIsLoggedIn(false);
      navigate('/');
    }
  };

  return (
    <div>
      <h2>退会</h2>
      {message && <p>{message}</p>} {/* メッセージがあれば表示 */}
      <form onSubmit={handleDelete}>
        <SubmitButton text="退会する" />
      </form>
    </div>
  );
};

export default UserDeleteForm;