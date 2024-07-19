import React, { useEffect, useState } from 'react';
import axios from 'axios';

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/posts/all');
        console.log('全ユーザーの投稿データ:', response.data);
        setPosts(response.data);
      } catch (error) {
        console.error('全ユーザーの投稿の取得に失敗しました', error);
        setError('全ユーザーの投稿の取得に失敗しました');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>全ユーザーの投稿</h1>
      <ul>
        {posts.map(post => (
          <li key={post.postId}>
            <h4>{post.title}</h4>
            <p>{post.content}</p>
            <small>投稿日: {new Date(post.createdAt).toLocaleString()}</small>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
