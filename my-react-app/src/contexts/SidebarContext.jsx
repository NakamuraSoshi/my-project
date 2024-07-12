import React, { createContext, useState, useContext } from 'react';

//サイドバーを管理させ、コンポーネント間で状態を共有する
const SidebarContext = createContext();

// コンテキストプロバイダーの作成
export const SidebarProvider = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  //開閉切り替え、反対の状態になる
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <SidebarContext.Provider value={{ sidebarOpen, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
};

// カスタムフックの作成
export const useSidebar = () => useContext(SidebarContext);
