import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import Start from './components/Start';
import UserDeleteForm from './components/UserDeleteForm';
import LogoutForm from './components/LogoutForm';
import { SidebarProvider } from './contexts/SidebarContext';
import { AuthProvider } from './contexts/AuthContext';

import SearchResults from './components/SearchResult';
import NewPost from './components/NewPost';
import MyPage from './components/MyPage'; 
import { UserProvider } from './contexts/UserContext';
import HomePage from './components/HomePage';



const App = () => {

    //サイドバーの状態共有、ルート指定
    return (
        <AuthProvider>
            <UserProvider>
                <SidebarProvider>
                    <Router>
                        <Routes>
                            <Route path='/' element={<Start  />}>
                                <Route index element={<HomePage />} />
                                <Route path='login' element={<LoginForm  />} />
                                <Route path='register' element={<RegisterForm  />} />
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



