import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../contexts/UserContext';
import axios from 'axios';
import BaseURL from '../config/url';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Alert } from '@mui/material';

const MyPage = () => {
  const { user } = useContext(UserContext);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 
  const [open, setOpen] = useState(false); 
  const [selectedPostId, setSelectedPostId] = useState(null); 

  useEffect(() => {
    // userが存在する場合のみ投稿を取得,fetchPostsの定義
    if (user) {
      const fetchPosts = async () => {
        try {
          const response = await axios.get(`${BaseURL}/posts/mypost`, {
            withCredentials: true, // クッキーを含める
          });
          setPosts(response.data);
        } catch (error) {
          setError('投稿の取得に失敗しました');
        } finally {
          setLoading(false); 
        }
      };

      //実行してデータ取得
      fetchPosts();
    } else {
      setLoading(false);
    }
  }, [user]);

  const handleDeleteClick = (postId) => {
    // 削除確認ダイアログを表示
    setSelectedPostId(postId); 
    setOpen(true); 
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`${BaseURL}/posts/delete`, {
        withCredentials: true, // クッキーを含める
        data: {
          postId: selectedPostId
        }
      });
  
      // 成功した場合は投稿リストを更新
      setPosts(posts.filter(post => post.postId !== selectedPostId));
    } catch (error) {
      console.error('投稿の削除に失敗しました', error);
      setError('投稿の削除に失敗しました');
      // 一定時間後にエラーメッセージを消す
      setTimeout(() => setError(null), 5000);
    } finally {
      setOpen(false);
      setSelectedPostId(null);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedPostId(null);
  };
  
  if (loading) {
    return <div>Loading...</div>; 
  }

  if (!user) {
    return <div>ユーザー情報が見つかりません</div>; 
  }

  return (
    <div>
      <h1>マイページ</h1>
      <h2>ユーザー名: {user.username}</h2>
      <h3>投稿一覧</h3>
      {error && <Alert severity="error">{error}</Alert>}
      <ul>
      {posts.map(post => (
          <li key={post.postId}>
            <h4>{post.title}</h4>
            <p>{post.content}</p>
            <small>投稿日: {new Date(post.createdAt).toLocaleString()}</small>
            <Button variant="outlined" color="secondary" onClick={() => handleDeleteClick(post.postId)}>削除</Button>
          </li>
        ))}
      </ul>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>投稿の削除確認</DialogTitle>
        <DialogContent>
          <DialogContentText>
            本当にこの投稿を削除してもよろしいですか？
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            キャンセル
          </Button>
          <Button onClick={handleConfirmDelete} color="secondary" autoFocus>
            削除
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default MyPage;
