import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import { BrowserRouter as Router } from 'react-router-dom';
import NewPost from './NewPost';
import AllPostPage from './AllPostPage';
import { UserContext } from '../contexts/UserContext';
import { AuthContext } from '../contexts/AuthContext';

jest.mock('axios'); // axiosをモック化

describe('投稿フローの結合テスト', () => {
  const user = { id: '1', name: 'Test User' };
  const setIsLoggedIn = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('新しい投稿を作成し、投稿一覧に表示されるまで', async () => {
    // リクエスト成功
    axios.put.mockResolvedValueOnce({
      data: { message: '投稿が成功しました' },
    });

    // get成功
    axios.get.mockResolvedValueOnce({
      data: [
        { postId: '1', title: '新しい投稿', content: 'これはテスト投稿です', author: user.name },
      ],
    });

    // 新規投稿の表示
    render(
      <Router>
        <AuthContext.Provider value={{ setIsLoggedIn }}>
          <UserContext.Provider value={{ user }}>
            <NewPost />
          </UserContext.Provider>
        </AuthContext.Provider>
      </Router>
    );

    // 新しい投稿の作成
    fireEvent.change(screen.getByLabelText(/タイトル/i), {
      target: { value: '新しい投稿' },
    });
    fireEvent.change(screen.getByLabelText(/内容/i), {
      target: { value: 'これはテスト投稿です' },
    });
    fireEvent.click(screen.getByText(/投稿/i));

    // 投稿成功メッセージが表示されるのを待つ
    expect(await screen.findByText('投稿が成功しました')).toBeInTheDocument();

    // レンダリングして投稿表示
    render(
      <Router>
        <UserContext.Provider value={{ user }}>
          <AllPostPage />
        </UserContext.Provider>
      </Router>
    );

    // 投稿一覧に新しい投稿が表示されることを確認
    await waitFor(() => {
      expect(screen.getByText('新しい投稿')).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText('これはテスト投稿です')).toBeInTheDocument();
    });
  });
});
