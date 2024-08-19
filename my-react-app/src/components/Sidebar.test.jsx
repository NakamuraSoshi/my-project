import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import { AuthProvider, AuthContext } from '../contexts/AuthContext';
import Sidebar from './Sidebar';
import { useSidebar } from '../contexts/SidebarContext';

jest.mock('../contexts/SidebarContext', () => ({
  useSidebar: jest.fn()
}));


describe('Sidebar', () => {
  const renderWithAuth = (isLoggedIn) => {
    useSidebar.mockReturnValue({ sidebarOpen: true }); //サイドバーを常に開けておく

    //ReactRouterの機能を使うためMemoryRouterでルーティング管理
    return render(
      <AuthContext.Provider value={{ isLoggedIn }}>
        <MemoryRouter>
          <Sidebar />
        </MemoryRouter>
      </AuthContext.Provider>
    );
  };

  test('ログインしている場合、サイドバーに新規作成とマイページのボタンが表示される', () => {
    renderWithAuth(true);

    expect(screen.getByText('新規作成')).toBeInTheDocument();
    expect(screen.getByText('マイページ')).toBeInTheDocument();
  });

  test('ログインしていない場合、サイドバーにログインと新規登録のボタンが表示される', () => {
    renderWithAuth(false);

    expect(screen.getByText('ログイン')).toBeInTheDocument();
    expect(screen.getByText('新規登録')).toBeInTheDocument();
  });

  test('サイドバーに正しいナビゲーションリンクが表示される', () => {
    renderWithAuth(false);

    expect(screen.getByText('ホームページ')).toBeInTheDocument();
    expect(screen.getByText('ログイン')).toBeInTheDocument();
    expect(screen.getByText('新規登録')).toBeInTheDocument();
  });
});

