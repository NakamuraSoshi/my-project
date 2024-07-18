import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import Start from './components/Start';
import UserDeleteForm from './components/UserDeleteForm';
import LogoutForm from './components/LogoutForm';
import { SidebarProvider } from './contexts/SidebarContext';
import Snackbar from './components/Snackbar';
import { AuthProvider } from './contexts/AuthContext';


import NewPost from './components/NewPost';
import MyPage from './components/MyPage'; 
import { UserProvider } from './contexts/UserContext';

const App = () => {
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');
    const [redirectTo, setRedirectTo] = useState('');

    //メッセージの内容を設定
    const showMessage = (msg, type, redirect) => {
        setMessage(msg);
        setMessageType(type);
        setRedirectTo(redirect);
    };

    const handleCloseSnackbar = () => {
        setMessage('');
        setRedirectTo('');
    };

    //サイドバーの状態共有、ルート指定
    return (
        <AuthProvider>
            <UserProvider>
                <SidebarProvider>
                    <Router>
                        <Routes>
                            <Route path='/' element={<Start showMessage={showMessage} />}>
                                <Route path='login' element={<LoginForm showMessage={showMessage} />} />
                                <Route path='register' element={<RegisterForm showMessage={showMessage} />} />
                                <Route path='logout' element={<LogoutForm showMessage={showMessage} />} />
                                <Route path='delete' element={<UserDeleteForm showMessage={showMessage} />} />
                                <Route path='create' element={<NewPost showMessage={showMessage} />} />
                                <Route path='mypage' element={<MyPage />} /> 
                            </Route>
                        </Routes>
                    </Router>
                    {message && (
                        <Snackbar
                            message={message}
                            type={messageType}
                            onClose={handleCloseSnackbar}
                            redirectTo={redirectTo}
                        />
                    )}
                </SidebarProvider>
            </UserProvider>
        </AuthProvider>
    );
};

export default App;



