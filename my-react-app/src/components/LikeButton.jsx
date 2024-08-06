import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { IconButton, Tooltip, Typography, Stack, Snackbar, Alert } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import BaseURL from '../config/url';

const LikeButton = ({ userId, postId }) => {
  const [likeCount, setLikeCount] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchLikeData = async () => {
      try {
        // いいねの状態といいね数を取得
        const response = await axios.get(`${BaseURL}/likes/status`, {
          params: { userId, postId },
          withCredentials: true // クッキーを送信するために `withCredentials` を設定
        });
        setIsLiked(response.data.liked);
        setLikeCount(Number(response.data.likeCount));
      } catch (error) {
        console.error('いいねのデータ取得に失敗しました', error);
        setError('いいねのデータ取得に失敗しました。後でもう一度お試しください。');
      }
    };

    fetchLikeData();
  }, [userId, postId]);

  const handleLike = async () => {
    try {
      if (!isLiked) {
        await axios.post(`${BaseURL}/likes/like`, { userId, postId }, {
          withCredentials: true // クッキーを送信するために `withCredentials` を設定
        });
        setIsLiked(true);
        setLikeCount(prevLikes => Number(prevLikes) + 1);
      } else {
        await axios.delete(`${BaseURL}/likes/unlike`, {
          params: { userId, postId },
          withCredentials: true // クッキーを送信するために `withCredentials` を設定
        });
        setIsLiked(false);
        setLikeCount(prevLikes => Number(prevLikes) - 1);
      }
    } catch (error) {
      console.error('いいねの操作に失敗しました', error);
      setError('いいねの操作に失敗しました。後でもう一度お試しください。');
    }
  };

  const handleCloseSnackbar = () => {
    setError('');
  };

  return (
    <Stack direction="column" alignItems="center">
      <Tooltip title={isLiked ? 'いいねを取り消す' : 'いいねする'}>
        <IconButton onClick={handleLike} color={isLiked ? 'error' : 'default'}>
          {isLiked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </IconButton>
      </Tooltip>
      <Typography variant="body2" color="textSecondary" style={{ marginTop: '4px' }}>
        {likeCount}
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
    </Stack>
  );
};

export default LikeButton;

