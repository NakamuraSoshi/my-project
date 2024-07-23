import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../contexts/UserContext';
import axios from 'axios';

const MyPage = () => {
  const { user } = useContext(UserContext);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  useEffect(() => {
    // userが存在する場合のみ投稿を取得,fetchPostsの定義
    if (user) {
      console.log('ユーザーID:', user.userId);
      const fetchPosts = async () => {
        try {
          const token = localStorage.getItem('token'); 
          const response = await axios.get('http://localhost:3001/api/posts/mypost', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          console.log('投稿データ:', response.data);//確認用
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

  const handleDelete = async (postId) => {
    // 削除確認ダイアログを表示
    const isConfirmed = window.confirm('投稿を削除しますか？');
  
    if (!isConfirmed) {

      return;
    }
  
    try {
      await axios.delete(`http://localhost:3001/api/posts/delete`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        data: {
          postId: postId
        }
      });
  
      // 成功した場合は投稿リストを更新
      setPosts(posts.filter(post => post.postId !== postId));
    } catch (error) {
      console.error('投稿の削除に失敗しました', error);
      setError('投稿の削除に失敗しました');
    }
  };
  
  if (loading) {
    return <div>Loading...</div>; 
  }

  if (error) {
    return <div>{error}</div>; 
  }

  if (!user) {
    return <div>ユーザー情報が見つかりません</div>; 
  }

  return (
    <div>
      <h1>マイページ</h1>
      <h2>ユーザー名: {user.username}</h2>
      <h3>投稿一覧</h3>
      <ul>
        {posts.map(post => (
          <li key={post.postId}>
            <h4>{post.title}</h4>
            <p>{post.content}</p>
            <small>投稿日: {new Date(post.createdAt).toLocaleString()}</small>
            <button onClick={() => handleDelete(post.postId)}>削除</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyPage;
