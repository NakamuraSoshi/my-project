import React, { useState, useEffect } from 'react';
import axios from 'axios';

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

        // サーバーから返されたデータをコンソールに表示
        console.log('Status Response:', statusResponse.data);

        // いいねの数を取得
        const countResponse = await axios.get('http://localhost:3001/api/likes/count', {
          params: { postId },
          headers: { 'Authorization': `Bearer ${token}` }
        });

        // サーバーから返されたデータをコンソールに表示
        console.log('Count Response:', countResponse.data);

        // いいねの数を数値として設定
        setLikes(Number(countResponse.data.likeCount));
      } catch (error) {
        console.error('いいねの状態または数を確認できませんでした', error);
      }
    };

    //画面表示と同時にサーバーから取得
    fetchLikeData();
  }, [userId, postId, token]);

  const handleLike = async () => {
    if (!liked) {
      try {
        await axios.post('http://localhost:3001/api/likes/like', { userId, postId }, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        setLiked(true);
        setLikes(prevLikes => Number(prevLikes) + 1); // いいねの数を数値として増加
      } catch (error) {
        console.error('いいねができませんでした', error);
      }
    }
  };

  return (
    <button onClick={handleLike} disabled={liked}>
      いいね {likes}
    </button>
  );
};

export default LikeButton;
