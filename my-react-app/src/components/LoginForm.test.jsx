import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import { AuthContext } from '../contexts/AuthContext';
import { UserContext } from '../contexts/UserContext';
import LoginForm from './LoginForm';
import { BrowserRouter as Router } from 'react-router-dom';

// axiosのモック化
jest.mock('axios');
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(), // useNavigateのモック化
}));

describe('LoginForm', () => { //LoginFormコンポーネントのテストスイートを定義
  const setIsLoggedIn = jest.fn(); //モックを作成
  const setUser = jest.fn();
  const navigate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks(); // モックのリセットなどを行う
  });

  //Routeでラップしてルーティング機能を提供し、Loginコンポーネントをレンダリング
  test('フォームの初期状態を確認するテスト', () => {
    render(
      <Router>
        <AuthContext.Provider value={{ setIsLoggedIn }}>
          <UserContext.Provider value={{ setUser }}>
            <LoginForm />
          </UserContext.Provider>
        </AuthContext.Provider>
      </Router>
    );

    //フォームの要素の期待値をセット
    expect(screen.getByLabelText(/ユーザーID/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/パスワード/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /ログイン/i })).toBeInTheDocument();
    expect(screen.getByText(/ホームへ戻る/i)).toBeInTheDocument();
  });

  test('有効なユーザーIDとパスワードを入力してログインを試みるテスト', async () => {
    //axios.postのレスポンスとuseNavigateをモック
    axios.post.mockResolvedValue({ data: { user: { id: '1', name: 'Test User' } } });
    jest.spyOn(require('react-router-dom'), 'useNavigate').mockImplementation(() => navigate);

    render(
      <Router>
        <AuthContext.Provider value={{ setIsLoggedIn }}>
          <UserContext.Provider value={{ setUser }}>
            <LoginForm />
          </UserContext.Provider>
        </AuthContext.Provider>
      </Router>
    );

    //フォームに値を入力してログインボタンをクリック
    fireEvent.change(screen.getByLabelText(/ユーザーID/i), { target: { value: 'validUser' } });
    fireEvent.change(screen.getByLabelText(/パスワード/i), { target: { value: 'validPassword' } });
    fireEvent.click(screen.getByRole('button', { name: /ログイン/i }));

    await waitFor(() => {
      expect(setUser).toHaveBeenCalledWith({ id: '1', name: 'Test User' });
    });
    await waitFor(() => {
      expect(setIsLoggedIn).toHaveBeenCalledWith(true);
    });
    await waitFor(() => {
      expect(navigate).toHaveBeenCalledWith('/');
    });
    expect(screen.queryByText(/ログインに失敗しました もう一度お試しください/i)).not.toBeInTheDocument();
    expect(screen.getByText(/ログインしました/i)).toBeInTheDocument();
  });

  test('無効なユーザーIDとパスワードでログインを試みるテスト', async () => {
    axios.post.mockRejectedValue(new Error('ログインに失敗しました'));
    jest.spyOn(require('react-router-dom'), 'useNavigate').mockImplementation(() => navigate);

    render(
      <Router>
        <AuthContext.Provider value={{ setIsLoggedIn }}>
          <UserContext.Provider value={{ setUser }}>
            <LoginForm />
          </UserContext.Provider>
        </AuthContext.Provider>
      </Router>
    );

    fireEvent.change(screen.getByLabelText(/ユーザーID/i), { target: { value: 'invalidUser' } });
    fireEvent.change(screen.getByLabelText(/パスワード/i), { target: { value: 'invalidPassword' } });
    fireEvent.click(screen.getByRole('button', { name: /ログイン/i }));

    await waitFor(() => {
      expect(setUser).not.toHaveBeenCalled();
    });
    await waitFor(() => {
      expect(setIsLoggedIn).not.toHaveBeenCalled();
    });
    expect(screen.getByText(/ログインに失敗しました もう一度お試しください/i)).toBeInTheDocument();
    expect(screen.queryByText(/ログインしました/i)).not.toBeInTheDocument();
  });

});

