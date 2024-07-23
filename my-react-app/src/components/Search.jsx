import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

//ユーザー入力テキストを保持
const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  //入力するたび実行
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  //ボタンを押すと実行
  const handleSearchSubmit = (event) => {
    event.preventDefault();
    navigate(`/search?query=${searchQuery}`);
  };

  return (
    <form id="search-form" role="search" onSubmit={handleSearchSubmit}>
      <input
        id="q"
        aria-label="ブログを検索"
        placeholder="検索"
        type="search"
        name="q"
        value={searchQuery}
        onChange={handleSearchChange}
      />
      <button type="submit">検索</button>
      <div id="search-spinner" aria-hidden hidden={true} />
      <div className="sr-only" aria-live="polite"></div>
    </form>
  );
};

export default Search;