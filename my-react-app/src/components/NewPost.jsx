import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import InputField from "./InputField";
import BaseURL from "../config/url";

const NewPost = () => {
  const [ title, setTitle ] = useState('');
  const [ content, setContent ] = useState('');
  const [ message, setMessage] = useState('');
  const [ error, setError ] = useState('');
  const navigate = useNavigate();

  //バリデーションの関数
  const validateForm = () => {
    const errors = {};

    if (title.length > 30) {
      errors.title = 'タイトルは30文字以内で入力してください';
    }

    if (content.length > 100) {
      errors.content = '本文は100文字以内で入力してください';
    }

    return errors;
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setError(validationErrors);
      return;
    }

    try {
      const response = await axios.put(
        `${BaseURL}/posts/create`,
        {
          title,
          content,
        },
        {
          // クッキーを送信するために `withCredentials` を設定
          withCredentials: true,
        }
      );

      setMessage(response.data.message);
      navigate('/');
    } catch (error) {
      setMessage(error.response?.data?.message || '投稿に失敗しました。もう一度お試しください');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <InputField
        label="タイトル"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        error={error.title}
      />
      
      <InputField
        label="内容"
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        error={error.content}
      />
      
      <button type="submit">投稿</button>
      
      {message && <p>{message}</p>}
    </form>
  );
};

export default NewPost;
