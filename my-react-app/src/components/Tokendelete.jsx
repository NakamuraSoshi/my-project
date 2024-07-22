import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const TokenClearer = () => {
  const { setIsLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleClearToken = () => {
    // ローカルストレージからトークンを削除
    localStorage.removeItem('token');
    setIsLoggedIn(false); // ログイン状態を更新
    navigate('/'); // ホームページへリダイレクト
  };

  return (
    <button type="button" onClick={handleClearToken}>
      トークンを削除
    </button>
  );
};

export default TokenClearer;
