import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const fetchUser = async () => {
                try {
                    const response = await axios.get('http://localhost:3001/api/users/info', {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    setUser(response.data);
                    
                } catch (error) {
                    console.error('ユーザー情報の取得に失敗しました', error);
                }
            };

            fetchUser();
        }
    }, []);

    return (
        <UserContext.Provider value={{ user }}>
            {children}
        </UserContext.Provider>
    );
};
