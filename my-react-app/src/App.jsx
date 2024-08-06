import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Start from './components/Start';
import AllPostPage from './components/AllPostPage';
import LoginForm from './components/LoginForm';
import UserRegisterForm from './components/UserRegisterForm';
import LogoutForm from './components/LogoutForm';
import UserDeleteForm from './components/UserDeleteForm';
import NewPost from './components/NewPost';
import MyPage from './components/MyPage'; 
import SearchResults from './components/SearchResult';

import { AuthProvider } from './contexts/AuthContext';
import { UserProvider } from './contexts/UserContext';
import { SidebarProvider } from './contexts/SidebarContext';

const App = () => {

    //サイドバーの状態共有、ルート指定
    return (
        <AuthProvider>
            <UserProvider>
                <SidebarProvider>
                    <Router>
                        <Routes>
                            <Route path='/' element={<Start  />}>
                                <Route index element={<AllPostPage />} />
                                <Route path='login' element={<LoginForm  />} />
                                <Route path='register' element={<UserRegisterForm  />} />
                                <Route path='logout' element={<LogoutForm  />} />
                                <Route path='delete' element={<UserDeleteForm  />} />
                                <Route path='create' element={<NewPost  />} />
                                <Route path='mypage' element={<MyPage />} /> 
                                <Route path="/search" element={<SearchResults />} />
                            </Route>
                        </Routes>
                    </Router>
                </SidebarProvider>
            </UserProvider>
        </AuthProvider>
    );
};

export default App;



