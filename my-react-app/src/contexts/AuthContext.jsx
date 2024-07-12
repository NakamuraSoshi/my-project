import React, { createContext, useState, useEffect } from 'react';

//ログインの認証を管理、共有
export const AuthContext = createContext();

//共有するためのコンテキストオブジェクト、useStateで状態変数を定義
export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    //実行される内容
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, []);

    //AuthContext.ProviderでisLoggedInの値を子に渡す
    return (
        <AuthContext.Provider value={{ isLoggedIn}}>
            {children}
        </AuthContext.Provider>
    );
};
