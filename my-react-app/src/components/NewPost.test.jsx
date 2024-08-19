import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import NewPost from './NewPost';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// モックの作成
jest.mock('axios');
jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

const mockNavigate = jest.fn();

describe('NewPost Component', () => {
  beforeEach(() => {
    useNavigate.mockImplementation(() => mockNavigate);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('フォームの初期状態を確認する', () => {
    render(<NewPost />);

    expect(screen.getByLabelText(/タイトル/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/内容/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /投稿/i })).toBeInTheDocument();
  });

  test('バリデーションエラーを表示する', async () => {
    render(<NewPost />);

    fireEvent.change(screen.getByLabelText(/タイトル/i), { target: { value: 'このタイトルは31文字です。このタイトルは31文字です。このタ' } });
    fireEvent.change(screen.getByLabelText(/内容/i), { target: { value: 'この内容は101文字の文章です。この内容は101文字の文章です。この内容は101文字の文章です。この内容は101文字の文章です。この内容は101文字の文章です。この内容は101文字の文章です。この内容は' } });
    fireEvent.click(screen.getByRole('button', { name: /投稿/i }));

    expect(await screen.findByText(/タイトルは30文字以内で入力してください/i)).toBeInTheDocument();
    expect(await screen.findByText(/本文は100文字以内で入力してください/i)).toBeInTheDocument();
  });

  test('投稿成功時にメッセージが表示され、リダイレクトされる', async () => {
    axios.put.mockResolvedValueOnce({ data: { message: '投稿が成功しました' } });

    render(<NewPost />);

    fireEvent.change(screen.getByLabelText(/タイトル/i), { target: { value: '新しい投稿タイトル' } });
    fireEvent.change(screen.getByLabelText(/内容/i), { target: { value: '新しい投稿内容' } });
    fireEvent.click(screen.getByRole('button', { name: /投稿/i }));

    expect(await screen.findByText(/投稿が成功しました/i)).toBeInTheDocument();
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });

  test('投稿失敗時にエラーメッセージが表示される', async () => {
    axios.put.mockRejectedValueOnce({ response: { data: { message: '投稿に失敗しました。もう一度お試しください' } } });

    render(<NewPost />);

    fireEvent.change(screen.getByLabelText(/タイトル/i), { target: { value: '新しい投稿タイトル' } });
    fireEvent.change(screen.getByLabelText(/内容/i), { target: { value: '新しい投稿内容' } });
    fireEvent.click(screen.getByRole('button', { name: /投稿/i }));

    expect(await screen.findByText(/投稿に失敗しました。もう一度お試しください/i)).toBeInTheDocument();
  });
// 空白のテスト
test('タイトルと内容が半角スペースの場合にエラーメッセージが表示される', async () => {
  // モックしたエラーレスポンス
  axios.put.mockRejectedValue({
    response: {
      data: {
        message: 'タイトルと内容は入力必須です',
      },
    },
  });

  render(<NewPost />);

  // タイトルと内容を空にする
  fireEvent.change(screen.getByLabelText(/タイトル/i), { target: { value: '' } });
  fireEvent.change(screen.getByLabelText(/内容/i), { target: { value: '' } });

  // 投稿ボタンをクリック
  fireEvent.click(screen.getByRole('button', { name: /投稿/i }));

  // バックエンドからのエラーメッセージが表示されることを確認
  expect(await screen.findByText(/タイトルと内容は入力必須です/i)).toBeInTheDocument();
});

// 半角文字のテスト
test('半角英数字と記号が正しく処理される', async () => {
  render(<NewPost />);

  fireEvent.change(screen.getByLabelText(/タイトル/i), { target: { value: 'Title123!@#' } });
  fireEvent.change(screen.getByLabelText(/内容/i), { target: { value: 'Content 123!@#' } });
  fireEvent.click(screen.getByRole('button', { name: /投稿/i }));

  expect(axios.put).toHaveBeenCalledWith(expect.any(String), expect.objectContaining({
    title: 'Title123!@#',
    content: 'Content 123!@#'
  }), expect.any(Object));
});

// 全角文字のテスト
test('全角文字が正しく処理される', async () => {
  render(<NewPost />);

  fireEvent.change(screen.getByLabelText(/タイトル/i), { target: { value: 'タイトル' } });
  fireEvent.change(screen.getByLabelText(/内容/i), { target: { value: '内容' } });
  fireEvent.click(screen.getByRole('button', { name: /投稿/i }));

  expect(axios.put).toHaveBeenCalledWith(expect.any(String), expect.objectContaining({
    title: 'タイトル',
    content: '内容'
  }), expect.any(Object));
});

// 機種依存文字のテスト
test('機種依存文字が正しく処理される', async () => {
  render(<NewPost />);

  const emoji = '😊';
  fireEvent.change(screen.getByLabelText(/タイトル/i), { target: { value: `タイトル ${emoji}` } });
  fireEvent.change(screen.getByLabelText(/内容/i), { target: { value: `内容 ${emoji}` } });
  fireEvent.click(screen.getByRole('button', { name: /投稿/i }));

  expect(axios.put).toHaveBeenCalledWith(expect.any(String), expect.objectContaining({
    title: `タイトル ${emoji}`,
    content: `内容 ${emoji}`
  }), expect.any(Object));
});

// 小数点や記号文字のテスト
test('小数点や記号文字が正しく処理される', async () => {
  render(<NewPost />);

  fireEvent.change(screen.getByLabelText(/タイトル/i), { target: { value: 'Title 123.45' } });
  fireEvent.change(screen.getByLabelText(/内容/i), { target: { value: 'Content with 123.45 & symbols' } });
  fireEvent.click(screen.getByRole('button', { name: /投稿/i }));

  expect(axios.put).toHaveBeenCalledWith(expect.any(String), expect.objectContaining({
    title: 'Title 123.45',
    content: 'Content with 123.45 & symbols'
  }), expect.any(Object));
});

test('投稿ボタンを2回連続で押したときの挙動を確認する', async () => {
  // モックのレスポンス設定
  axios.put.mockResolvedValueOnce({ data: { message: '投稿が成功しました' } });

  render(<NewPost />);

  // フォームに入力
  fireEvent.change(screen.getByLabelText(/タイトル/i), { target: { value: '連続テスト投稿タイトル' } });
  fireEvent.change(screen.getByLabelText(/内容/i), { target: { value: '連続テスト投稿内容' } });

  // 投稿ボタンを2回連続で押す
  fireEvent.click(screen.getByRole('button', { name: /投稿/i }));
  fireEvent.click(screen.getByRole('button', { name: /投稿/i }));

  // 投稿成功メッセージが表示されるのを待つ
  expect(await screen.findByText(/投稿が成功しました/i)).toBeInTheDocument();

  // axios.putが1回だけ呼び出されたことを確認
  expect(axios.put).toHaveBeenCalledTimes(1);
  expect(axios.put).toHaveBeenCalledWith(expect.any(String), expect.objectContaining({
    title: '連続テスト投稿タイトル',
    content: '連続テスト投稿内容'
  }), expect.any(Object));
});

});
