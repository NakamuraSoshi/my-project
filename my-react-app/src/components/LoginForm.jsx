import React, { useContext, useState } from 'react';
import axios from 'axios';
import { TextField, Button, Container, Typography, Snackbar, Alert } from '@mui/material';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { UserContext } from '../contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import BaseURL from '../config/url';
import styles from '../styles/loginForm.module.css'
import { MESSAGE_TYPES, COLORS, SNACKBAR_SETTINGS } from '../config/constants';

//useStateで状態管理
const LoginForm = () => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const { setIsLoggedIn} = useContext(AuthContext);
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${BaseURL}/users/login`, {
        userId,
        password
      }, {
        withCredentials: true // クッキーを含むリクエストを送信
      });

      //ログイン成功でuserをセット、

      setUser(response.data.user);
      setMessage('ログインしました');
      setMessageType(MESSAGE_TYPES.SUCCESS);
      setIsLoggedIn(true);
      navigate('/');
    } catch (error) {
      setMessage('ログインに失敗しました もう一度お試しください');
      setMessageType(MESSAGE_TYPES.ERROR);
    }
  };

  const handleCloseSnackbar = () => {
    setMessage('');
  }

  return (
    <Container className={styles.container}>
      <Typography variant="h4" component="h1" className={styles.title}>
        ログイン
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="ユーザーID"
          variant="outlined"
          fullWidth
          margin="normal"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
        <TextField
          label="パスワード"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          type="submit"
          variant="contained"
          color={COLORS.PRIMARY}
          fullWidth
          className={styles.submitButton}
        >
          ログイン
        </Button>
      </form>
      <Link to="/" className={styles.homeLink}>
        <Button variant="text" fullWidth>ホームへ戻る</Button>
      </Link>
      <Snackbar
        open={!!message}
        autoHideDuration={SNACKBAR_SETTINGS.AUTO_HIDE_DURATION}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity={messageType} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default LoginForm;
