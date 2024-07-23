import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useSidebar } from '../contexts/SidebarContext';
import { AuthContext } from '../contexts/AuthContext';
import Search from './Search';
import '../styles/style.css';

//フックでサイドバーとログインの状態を取得
const Sidebar = () => {
  const { sidebarOpen } = useSidebar();
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <div id="sidebar" className={sidebarOpen ? 'open' : ''}>
    {isLoggedIn && (
      <div>
        <Search />
        <Link to="/create">
          <button type="submit">新規作成</button>
        </Link>
        <Link to="mypage">
        <button type="submit">マイページ</button>
        </Link>
      </div>
    )}
      <nav>
        <ul>
          <li>
            <Link to="/">ホームページ</Link>
          </li>
          {!isLoggedIn ? (
            <>
              <li>
                <Link to="/login">ログイン</Link>
              </li>
              <li>
                <Link to="/register">新規登録</Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/logout">ログアウト</Link>
              </li>
              <li>
                <Link to="/delete">ユーザー削除</Link>
              </li>
              
            </>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;