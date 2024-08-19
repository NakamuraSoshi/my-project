import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import LikeButton from './LikeButton';

// axiosをモック化して実際のAPIリクエストを送らないようにする
jest.mock('axios');

describe('LikeButton', () => {
  const userId = 'testUser'; // テストで使うID
  const postId = 'testPost';

  beforeEach(() => {
    jest.clearAllMocks(); // モック履歴をクリア
  });

  test('初期レンダリングで「いいね」の状態といいね数を取得する', async () => {
    
    axios.get.mockResolvedValue({
      data: { liked: true, likeCount: 10 }, // axios.getのモックが成功しデータを返す
    });
  

    render(<LikeButton userId={userId} postId={postId} />); // レンダリング

    expect(await screen.findByText('10')).toBeInTheDocument(); // いいね数が表示されることを確認
    expect(await screen.findByLabelText('いいねを取り消す')).toBeInTheDocument(); // ボタンが表示されることを確認

  });

  test('いいねをするテスト', async () => {
    
    axios.get.mockResolvedValue({
      data: { liked: false, likeCount: 9 }, // 初期値でいいねされていない設定
    });
  
    axios.post.mockResolvedValue({}); // axios.postが成功

    render(<LikeButton userId={userId} postId={postId} />);

    // ボタンクリックによる状態の更新
    fireEvent.click(screen.getByLabelText('いいねする'));

    // `waitFor` を使用して、非同期の状態変化を待つ
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(expect.any(String), { userId, postId }, expect.any(Object)); // postリクエストが正しい引数で呼び出されたか確認
    });
    await waitFor(() => {
      expect(screen.getByText('10')).toBeInTheDocument(); // いいね数が更新されることを確認
    });
    await waitFor(() => {
      expect(screen.getByLabelText('いいねを取り消す')).toBeInTheDocument(); // ボタンが更新されることを確認
    });
  });

  test('いいねを取り消すテスト', async () => {
   
    axios.get.mockResolvedValue({
      data: { liked: true, likeCount: 10 }, // 初期はいいねされている
    });
    axios.delete.mockResolvedValue({}); // deleteリクエストが成功

    render(<LikeButton userId={userId} postId={postId} />); // レンダリング
    
     await waitFor(() => {
       console.log('確認用:', screen.getByLabelText('いいねを取り消す').outerHTML);
     });
    // ボタンクリックによる状態の更新
    fireEvent.click(screen.getByLabelText('いいねを取り消す'));
    
    // `waitFor` を使用して、非同期の状態変化を待つ
    await waitFor(() => {
      expect(axios.delete).toHaveBeenCalledWith(expect.any(String), {
        params: { userId, postId },
        withCredentials: true
      });
    });

    await waitFor(() => {
      expect(screen.getByText('9')).toBeInTheDocument(); // いいね数が更新されることを確認
    });
    await waitFor(() => {
      expect(screen.getByLabelText('いいねする')).toBeInTheDocument(); // ボタンが更新されることを確認
    });
  });

  test('初期データ取得時にサーバーエラーが発生した場合のテスト', async () => {
    axios.get.mockRejectedValue(new Error('サーバーエラー')); // axios.getがエラーを返すように設定

    render(<LikeButton userId={userId} postId={postId} />);

    expect(await screen.findByText('いいねのデータ取得に失敗しました。後でもう一度お試しください。')).toBeInTheDocument(); // エラーメッセージの確認
  });

  test('いいね操作時にサーバーエラーが発生した場合のテスト', async () => {
    axios.get.mockResolvedValue({
      data: { liked: false, likeCount: 9 }, // 初期はいいねされていない
    });
    axios.post.mockRejectedValue(new Error('サーバーエラー')); // axios.postがエラーを返す設定

    render(<LikeButton userId={userId} postId={postId} />);

    fireEvent.click(screen.getByLabelText('いいねする'));

    // `waitFor` を使用して、非同期の状態変化を待つ
    expect(await screen.findByText('いいねの操作に失敗しました。後でもう一度お試しください。')).toBeInTheDocument(); // エラーメッセージの確認
  });
});


