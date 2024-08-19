import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../contexts/UserContext';
import BaseURL from '../config/url';
import { Container, Typography, Snackbar, Alert, List } from '@mui/material';
import PostDisplay from './PostDisplay';

const SearchResult = () => {
  const { user } = useContext(UserContext);
  const [results, setResults] = useState([]);
  const [error, setError] = useState(''); // エラーメッセージの状態
  const location = useLocation();
  const searchTerm = new URLSearchParams(location.search).get('searchTerm');

  // 検索結果の取得
  useEffect(() => {
    const fetchResult = async () => {
      try {
        const response = await axios.get(`${BaseURL}/posts/search`, {
          params: { searchTerm },
          withCredentials: true, // クッキーを送信するために `withCredentials` を設定
        });
        setResults(response.data);
      } catch (error) {
        console.error('検索結果の取得に失敗しました', error);
        setError('検索結果の取得に失敗しました。後でもう一度お試しください。'); // エラーメッセージを設定
      }
    };

    if (searchTerm) {
      fetchResult();
    }
  }, [searchTerm]);

  const handleCloseSnackbar = () => {
    setError('');
  };

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        検索結果
      </Typography>
      {error && (
        <Snackbar
          open={!!error}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
        >
          <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
            {error}
          </Alert>
        </Snackbar>
      )}
      {results.length === 0 ? (
        <Typography variant="body1" color="textSecondary">
          検索結果が見つかりませんでした。
        </Typography>
      ) : (
        <List>
          {results.map(post => (
            <PostDisplay key={post.postId} post={post} user={user} />
          ))}
        </List>
      )}
    </Container>
  );
};

export default SearchResult;