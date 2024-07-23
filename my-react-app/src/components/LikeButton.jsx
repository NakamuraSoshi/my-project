import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { IconButton, Tooltip, Typography, Stack } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const LikeButton = ({ userId, postId }) => {
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchLikeData = async () => {
      try {
        // いいねの状態を確認
        const statusResponse = await axios.get('http://localhost:3001/api/likes/check', {
          params: { userId, postId },
          headers: { 'Authorization': `Bearer ${token}` }
        });
        setLiked(statusResponse.data.liked);

        // いいねの数を取得
        const countResponse = await axios.get('http://localhost:3001/api/likes/count', {
          params: { postId },
          headers: { 'Authorization': `Bearer ${token}` }
        });

        setLikes(Number(countResponse.data.likeCount));
      } catch (error) {
        console.error('いいねの状態または数を確認できませんでした', error);
      }
    };

    fetchLikeData();
  }, [userId, postId, token]);

  const handleLike = async () => {
    try {
      if (!liked) {
        await axios.post('http://localhost:3001/api/likes/like', { userId, postId }, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        setLiked(true);
        setLikes(prevLikes => Number(prevLikes) + 1);
      } else {
        await axios.post('http://localhost:3001/api/likes/unlike', { userId, postId }, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        setLiked(false);
        setLikes(prevLikes => Number(prevLikes) - 1);
      }
    } catch (error) {
      console.error('いいねの操作に失敗しました', error);
    }
  };

  return (
    <Stack direction="column" alignItems="center">
      <Tooltip title={liked ? 'いいねを取り消す' : 'いいねする'}>
        <IconButton onClick={handleLike} color={liked ? 'error' : 'default'}>
          {liked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </IconButton>
      </Tooltip>
      <Typography variant="body2" color="textSecondary" style={{ marginTop: '4px' }}>
        {likes}
      </Typography>
    </Stack>
  );
};

export default LikeButton;
