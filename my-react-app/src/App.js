//アプリのメインコンポーネント

import React from 'react';
import Register from './components/Register';
import LoginForm from './components/LoginForm';

const App = () => {
    return (
        <div>
            <h1>ブログプラットフォーム</h1>
            <Register />
            <LoginForm />
        </div>
    );
};

export default App;
