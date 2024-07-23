import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import LikeButton from './LikeButton';
import { UserContext } from '../contexts/UserContext';

const SearchResults = () => {
  const { user } = useContext(UserContext);
  const [results, setResults] = useState([]);
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('query');


  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/posts/search', {
          params: { query }
        });
        setResults(response.data);
      } catch (error) {
        console.error('検索結果の取得に失敗しました', error);
      }
    };

    if (query) {
      fetchResults();
    }
  }, [query]);

  return (
    <div>
      <h1>検索結果</h1>
      <ul>
        {results.map(post => (
          <li key={post.postId}>
            <h4>{post.title}</h4>
            <p>{post.content}</p>
            <small>投稿者: {post.username}</small>
            <small>投稿日: {new Date(post.createdAt).toLocaleString()}</small>
            <LikeButton userId={user.userId} postId={post.postId} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchResults;
