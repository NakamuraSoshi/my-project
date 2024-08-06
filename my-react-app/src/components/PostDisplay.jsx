import React from 'react';
import { Typography, ListItem, ListItemText, Paper } from '@mui/material';
import LikeButton from './LikeButton';

const PostDisplay = ({ post, user }) => {
  return (
    <ListItem key={post.postId} component={Paper} style={{ marginBottom: '16px', padding: '16px' }}>
      <ListItemText
        primary={<Typography variant="h6">{post.title}</Typography>}
        secondary={
          <>
            <Typography variant="body1">{post.content}</Typography>
            <Typography variant="caption" color="textSecondary">
              投稿者: {post.username} ・ 投稿日: {new Date(post.createdAt).toLocaleString()}
            </Typography>
          </>
        }
      />
      {user && <LikeButton userId={user.userId} postId={post.postId} />}
    </ListItem>
  );
};

export default PostDisplay;
