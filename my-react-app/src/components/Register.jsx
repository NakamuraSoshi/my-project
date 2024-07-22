//ユーザー登録コンポーネント
import React, { useState } from 'react';
import axios from 'axios';

//usestateフックで状態を管理
const Register = () => {
    const [userId, setUserId] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    //handleSubmit関数：フォーム送信で実行される、axioでPOSTリクエストを送信
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/api/users/register', {
                userId,
                username,
                password
            });
            setMessage(response.data.message);
        } catch (error) {
            setMessage('登録に失敗しました もう一度お試しください');
        }
    };

    //returnブロックでコンポーネントがレンダリングするHTMLを定義
    //onSubmitでフォーム送信時にhandleSubmit呼び出し、onchangeで入力値に対応する関数呼び出し
    return (
        <div>
            <h2>ユーザー登録</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>ユーザーID:</label>
                    <input
                        type="text"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                    />
                </div>
                <div>
                    <label>ユーザー名:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div>
                    <label>パスワード:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit">登録</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default Register;


      
    
