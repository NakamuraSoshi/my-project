import React from 'react';

const BlogPosts = () => {
  const posts = [
    { id: 1, title: "初めてのブログ", content: "これは私の最初のブログ投稿です。" },
    { id: 2, title: "次の投稿", content: "ここでは次の内容について話します。" },
  ];

  return (
    <div>
      <h1>ブログ投稿</h1>
      <h2>ここにブログ内容を一覧表示</h2>
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlogPosts;
