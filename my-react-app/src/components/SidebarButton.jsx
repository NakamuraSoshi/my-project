import React from 'react';
import { useSidebar } from '../contexts/SidebarContext';
import '../styles/style.css';

//サイドバーの切り替えボタン
const SidebarButton = () => {
  const { toggleSidebar, sidebarOpen } = useSidebar();

  return (
    <button id="sidebarToggle" onClick={toggleSidebar}>
      {sidebarOpen ? 'メニューを閉じる' : 'メニューを開く'}
    </button>
  );
};

export default SidebarButton;
