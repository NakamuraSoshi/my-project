//スナックバーのコンポーネント
import React, { useEffect } from 'react';
import '../styles/style.css';
import { useNavigate } from 'react-router-dom';

//スナックバー関数でスナックバー表示
const Snackbar = ({ message, type, onClose, redirectTo }) => {
  const navigate = useNavigate();

  //2秒後に閉じてパスにリダイレクト
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        onClose();
        if (redirectTo) {
          navigate(redirectTo);
        }
      }, 2000); 

      return () => clearTimeout(timer);
    }
  }, [message, onClose, redirectTo, navigate]);

  return (
    <div className={`snackbar ${type}`}>
      {message}
    </div>
  );
};

export default Snackbar;