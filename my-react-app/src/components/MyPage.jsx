import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../contexts/UserContext';
import axios from 'axios';

const MyPage = () => {
  const { user } = useContext(UserContext);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true); // ローディング状態を追加
  const [error, setError] = useState(null); // エラー状態を追加

  useEffect(() => {
    // userが存在する場合のみ投稿を取得
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
          setPosts(response.data);
        } catch (error) {
          console.error('投稿の取得に失敗しました', error);
          setError('投稿の取得に失敗しました');
        } finally {
          setLoading(false); // ローディング状態を解除
        }
      };

      fetchPosts();
    } else {
      setLoading(false); // userが存在しない場合もローディング状態を解除
    }
  }, [user]);

  const handleDelete = async (postId) => {
    try {
      await axios.delete(`/api/posts/`);
      setPosts(posts.filter(post => post.id !== postId));
      // 成功メッセージなどを表示する場合はここで追加する
    } catch (error) {
      console.error('投稿の削除に失敗しました', error);
      // エラーメッセージを設定する
    }
  };

  if (loading) {
    return <div>Loading...</div>; // ローディング中の表示
  }

  if (error) {
    return <div>{error}</div>; // エラーがある場合の表示
  }

  if (!user) {
    return <div>ユーザー情報が見つかりません</div>; // ユーザーが存在しない場合の表示
  }

  return (
    <div>
      <h1>マイページ</h1>
      <h2>ユーザー名: {user.username}</h2>
      <h3>投稿一覧</h3>
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <h4>{post.title}</h4>
            <p>{post.content}</p>
            <button onClick={() => handleDelete(post.id)}>削除</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyPage;
