import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

//ユーザー情報を共有
export const UserContext = createContext();

//子コンポーネントにUserContextを提供
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await axios.get('http://localhost:3001/api/users/info', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUser(response.data);
        } catch (error) {
          console.error('ユーザー情報の取得に失敗しました', error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    //ここで実行
    fetchUser();
  }, []);

  //trueで表示
  if (loading) {
    return <div>Loading...</div>;
  }

  //user状態とその更新関数をコンテキストの値として提供,childrenを中に置くと使用可能に
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

