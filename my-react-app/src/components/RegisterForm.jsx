import React, { useState } from 'react';
import axios from 'axios';
import InputField from './InputField';
import SubmitButton from './SubmitButton';

//ユーザー登録フォーム
const RegisterForm = () => {
  const [userId, setUserId] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});

  //フォームの入力値を検証、エラーメッセージをnewErrorsに保存
  const validate = () => {
    const newErrors = {};
    const alphanumeric = /^[a-zA-Z0-9]+$/;

    if (!userId) newErrors.userId = 'ユーザーIDは必須です';
    else if (!alphanumeric.test(userId)) newErrors.userId = 'ユーザーIDは英数字のみ入力可能です';

    if (!username) newErrors.username = 'ユーザー名は必須です';

    if (!password) newErrors.password = 'パスワードは必須です';
    else if (!alphanumeric.test(password)) newErrors.password = 'パスワードは英数字のみ入力可能です';
    else if (password.length < 8) newErrors.password = 'パスワードは8文字以上必要です';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  //handleSubmit関数：フォーム送信で実行される、axioでPOSTリクエストを送信
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validate()) return;

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

  //レンダリング
  return (
    <div>
      <h2>ユーザー登録</h2>
      <form onSubmit={handleSubmit}>
        <InputField
          label="ユーザーID:"
          type="text"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          error={errors.userId}
        />
        <InputField
          label="ユーザー名:"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          error={errors.username}
        />
        <InputField
          label="パスワード:"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={errors.password}
        />
        <SubmitButton text="登録" />
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default RegisterForm;
