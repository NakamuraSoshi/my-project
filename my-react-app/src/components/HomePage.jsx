import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Typography, List, ListItem, ListItemText, CircularProgress, Snackbar, Alert, Paper } from '@mui/material';
import LikeButton from './LikeButton';
import { UserContext } from '../contexts/UserContext';

const HomePage = () => {
  const { user } = useContext(UserContext);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/posts/all');
        console.log('全ユーザーの投稿データ:', response.data);
        setPosts(response.data);
        setMessage('投稿データの取得に成功しました');
        setMessageType('success');
      } catch (error) {
        console.error('全ユーザーの投稿の取得に失敗しました', error);
        setError('全ユーザーの投稿の取得に失敗しました');
        setMessage('投稿データの取得に失敗しました');
        setMessageType('error');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleCloseSnackbar = () => {
    setMessage('');
  };

  if (loading) {
    return (
      <Container maxWidth="sm" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="sm">
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <Typography variant="h4" component="h1" gutterBottom>
        全ユーザーの投稿
      </Typography>
      <List>
        {posts.map(post => (
          <ListItem key={post.postId} component={Paper} style={{ marginBottom: '16px', padding: '16px' }}>
            <ListItemText
              primary={<Typography variant="h6">{post.title}</Typography>}
              secondary={
                <>
                  <Typography variant="body1">{post.content}</Typography>
                  <Typography variant="caption" color="textSecondary">
                    投稿者: {post.username} ・ 投稿日: {new Date(post.createdAt).toLocaleString()}
                  </Typography>
                </>
              }
            />
            {user && <LikeButton userId={user.userId} postId={post.postId} />}
          </ListItem>
        ))}
      </List>
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

export default HomePage;
