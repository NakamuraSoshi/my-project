import React, { useContext, useState } from 'react';
import axios from 'axios';
import { Container, Typography, Button, Snackbar, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { UserContext } from '../contexts/UserContext';

const LogoutForm = () => {
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const navigate = useNavigate();
  const { setIsLoggedIn } = useContext(AuthContext);
  const { setUser } = useContext(UserContext);

  const handleLogout = async (event) => {
    event.preventDefault(); 
    try {
      const token = localStorage.getItem('token'); 
      if(!token) {
        console.error('トークンが存在しません');
        return;
      }
      console.log('送信トークン:', token);
      const response = await axios.post(
        'http://localhost:3001/api/users/logout',
        {},
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      setMessage(response.data.message); 
      setMessageType('success');
      localStorage.removeItem('token'); 
      setIsLoggedIn(false);
      console.log('ログアウトしました');
      setUser(null);
      navigate('/');
    } catch (error) {
      console.error('ログアウト時にエラーが発生しました', error);
      setMessage('ログアウト時にエラーが発生しました');
      setMessageType('error');
      localStorage.removeItem('token'); 
      setIsLoggedIn(false);
      window.location.href = '/';
    }
  };

  const handleCloseSnackbar = () => {
    setMessage('');
  }

  return (
    <Container maxWidth="xs">
      <Typography variant="h4" component="h1" gutterBottom>
        ログアウト
      </Typography>
      {message && (
        <Snackbar
          open={!!message}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
        >
          <Alert onClose={handleCloseSnackbar} severity={messageType} sx={{ width: '100%' }}>
            {message}
          </Alert>
        </Snackbar>
      )}
      <form onSubmit={handleLogout}>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          style={{ marginTop: '16px' }}
        >
          ログアウト
        </Button>
      </form>
    </Container>
  );
};

export default LogoutForm;
