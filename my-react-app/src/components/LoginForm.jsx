import React, { useContext, useState } from 'react';
import axios from 'axios';
import { TextField, Button, Container, Typography, Snackbar, Alert } from '@mui/material';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { UserContext } from '../contexts/UserContext';
import { useNavigate } from 'react-router-dom';

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
      const response = await axios.post('http://localhost:3001/api/users/login', {
        userId,
        password
      });

      //ログイン成功でトークンをローカルストレージに保存、userをセット、
      localStorage.setItem('token', response.data.token);
      setUser(response.data.user);
      setMessage('ログインしました');
      setMessageType('success');
      setIsLoggedIn(true);
      navigate('/');
    } catch (error) {
      setMessage('ログインに失敗しました もう一度お試しください');
      setMessageType('error');
    }
  };

  const handleCloseSnackbar = () => {
    setMessage('');
  }

  return (
    <Container maxWidth="xs">
      <Typography variant="h4" component="h1" gutterBottom>
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
          color="primary"
          fullWidth
          style={{ marginTop: '16px' }}
        >
          ログイン
        </Button>
      </form>
      <Link to="/" style={{ textDecoration: 'none', marginTop: '16px', display: 'block' }}>
        <Button variant="text" fullWidth>ホームへ戻る</Button>
      </Link>
      <Snackbar
        open={!!message}
        autoHideDuration={6000}
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
