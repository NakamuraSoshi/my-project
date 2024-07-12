import React, { useContext } from 'react';
import { useSidebar } from '../contexts/SidebarContext';
import { AuthContext } from '../contexts/AuthContext';
import '../styles/style.css';

//フックでサイドバーとログインの状態を取得
const Sidebar = () => {
  const { sidebarOpen } = useSidebar();
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <div id="sidebar" className={sidebarOpen ? 'open' : ''}>
      
      <div>
        <form id="search-form" role="search">
          <input
            id="q"
            aria-label="ブログを検索"
            placeholder="検索"
            type="search"
            name="q"
          />
          <div id="search-spinner" aria-hidden hidden={true} />
          <div className="sr-only" aria-live="polite"></div>
        </form>
        <form method="post">
          <button type="submit">新規作成</button>
        </form>
      </div>
      <nav>
        <ul>
          {!isLoggedIn ? (
            <>
              <li>
                <a href={`/login`}>ログイン</a>
              </li>
              <li>
                <a href={`/register`}>新規登録</a>
              </li>
            </>
          ) : (
            <>
              <li>
                <a href={`/logout`}>ログアウト</a>
              </li>
              <li>
                <a href={`/delete`}>ユーザー削除</a>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;