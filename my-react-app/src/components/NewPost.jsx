import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import InputField from "./InputField";
import SubmitButton from "./SubmitButton";

const NewPost = () => {
  const [ title, setTitle ] = useState('');
  const [ content, setContent ] = useState('');
  const [ message, setMessage] = useState('');
  const [ error, setError ] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    let validationErrors = {};

    if (title.length > 30 ){
      validationErrors.title = 'タイトルは30文字以内で入力してください';
    }

    if (content.length > 100) {
      validationErrors.content = '本文は100文字以内で入力してください';
    }

    if (Object.keys(validationErrors).length > 0){
      setError(validationErrors);
      return;
    }

    try{
      const response = await axios.post('http://localhost:3001/api/posts', {
        title,
        content,
      });

      setMessage(response.data.message);
      navigate('/');
    } catch (error) {
      setMessage('投稿に失敗しました。もう一度お試しください');
    }
  };

  return(
    <form onSubmit = {handleSubmit}>
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
      error={error.context}
      />
      <SubmitButton text="投稿"/>
      {message && <p>{message}</p>}
      </form>
  );
};

export default NewPost;