//アプリのメインコンポーネント

import React from 'react';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import LogoutForm from './components/LogoutForm';
import UserDeleteForm from './components/UserDeleteForm';

const App = () => {
    return (
        <div>
            <h1>ブログプラットフォーム</h1>
            <RegisterForm/>
            <LoginForm />
            <LogoutForm/>
            <UserDeleteForm/>
        </div>
    );
};

export default App;
