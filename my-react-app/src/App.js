//アプリのメインコンポーネント

import React from 'react';
import Register from './components/Register';

const App = () => {
    return (
        <div>
            <h1>ブログプラットフォーム</h1>
            <Register />
        </div>
    );
};

export default App;
