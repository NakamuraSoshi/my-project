import React, { useState } from 'react';
import axios from 'axios';
import InputField from './InputField';
import SubmitButton from './SubmitButton';

const RegisterForm = () => {
  const [userId, setUserId] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/api/users/register', {
        userId,
        username,
        password
      });
      setMessage(response.data.message);
    } catch (error) {
      setMessage('登録に失敗しました もう一度お試しください');
    }
  };

  return (
    <div>
      <h2>ユーザー登録</h2>
      <form onSubmit={handleSubmit}>
        <InputField
          label="ユーザーID:"
          type="text"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
        <InputField
          label="ユーザー名:"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <InputField
          label="パスワード:"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <SubmitButton text="登録" />
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default RegisterForm;
