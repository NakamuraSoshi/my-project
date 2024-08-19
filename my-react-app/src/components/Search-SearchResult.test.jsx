import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import Search from './Search';
import SearchResult from './SearchResult';
import { UserContext } from '../contexts/UserContext';

jest.mock('axios');

describe('Search and SearchResult', () => {
  test('検索フォームに入力して検索すると、検索結果ページにリダイレクトされる', async () => {
    const mockPosts = [
      { postId: 1, title: 'Test Post 1', content: 'Content 1' },
      { postId: 2, title: 'Test Post 2', content: 'Content 2' }
    ];

    axios.get.mockResolvedValueOnce({ data: mockPosts });

    render(
      <UserContext.Provider value={{ user: { id: 1, name: 'Test User' } }}>
        <MemoryRouter initialEntries={['/']}>
          <Routes>
            <Route path="/" element={<Search />} />
            <Route path="/search" element={<SearchResult />} />
          </Routes>
        </MemoryRouter>
      </UserContext.Provider>
    );

    // 検索フォームに入力
  fireEvent.change(screen.getByPlaceholderText('検索'), { target: { value: 'Test' } });
  fireEvent.click(screen.getByRole('button', { name: '検索' }));

  // 検索結果が1件目が表示されるまで待つ
  await expect(screen.findByText('Test Post 1')).resolves.toBeInTheDocument();

  // 検索結果が2件目が表示されることを確認
  await expect(screen.findByText('Test Post 2')).resolves.toBeInTheDocument();
});

  test('検索結果がない場合、該当する結果がない旨のメッセージが表示される', async () => {
    axios.get.mockResolvedValueOnce({ data: [] });

    render(
      <UserContext.Provider value={{ user: { id: 1, name: 'Test User' } }}>
        <MemoryRouter initialEntries={['/search?searchTerm=NoResults']}>
          <Routes>
            <Route path="/" element={<Search />} />
            <Route path="/search" element={<SearchResult />} />
          </Routes>
        </MemoryRouter>
      </UserContext.Provider>
    );

    //テキストが複数の要素に分割されていると出たのでcontentで全テキストから取得
    await waitFor(() => {
      expect(screen.getByText((content, element) => content.includes('検索結果が見つかりませんでした'))).toBeInTheDocument();
    });
  });

  test('検索中にエラーが発生した場合、エラーメッセージが表示される', async () => {
    axios.get.mockRejectedValueOnce(new Error('ネットワークエラー'));

    render(
      <UserContext.Provider value={{ user: { id: 1, name: 'Test User' } }}>
        <MemoryRouter initialEntries={['/search?searchTerm=ErrorTest']}>
          <Routes>
            <Route path="/" element={<Search />} />
            <Route path="/search" element={<SearchResult />} />
          </Routes>
        </MemoryRouter>
      </UserContext.Provider>
    );

    await waitFor(() => {
      expect(screen.getByText('検索結果の取得に失敗しました。後でもう一度お試しください。')).toBeInTheDocument();
    });
  });
});
