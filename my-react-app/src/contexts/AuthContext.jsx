import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import BaseURL from '../config/url'; // BaseURLをインポート

// ログインの認証を管理、共有
export const AuthContext = createContext();

// 共有するためのコンテキストオブジェクト、useStateで状態変数を定義
export const AuthProvider = ({ children }) => {
    //認証状態を管理
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const checkToken = async () => {
            try {
                //クッキーからトークン抽出
                const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, "$1");
                if (token) {
                    // トークンの有効性をサーバーで確認
                    const response = await axios.post(`${BaseURL}/users/tokenCheck`, {}, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    //有効
                    if (response.status === "成功") {
                        setIsLoggedIn(true);
                    } else {
                        //無効
                        setIsLoggedIn(false);
                    }
                } else {
                    //存在しない
                    setIsLoggedIn(false);
                }
            } catch (error) {
                //エラー
                setIsLoggedIn(false);
            }
        };

        checkToken();
    }, []);

    return (
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
            {children}
        </AuthContext.Provider>
    );
};
