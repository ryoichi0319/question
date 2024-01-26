// App.jsx

import React, { useState } from "react";
import './App.css';
import { useHistory } from "react-router-dom"; // React RouterからuseHistoryをインポート

function App() {
  const [name, setName] = useState('');
  const [language, setLanguage] = useState('');
  const [id, setId] = useState(0);
  const [submissionMessage, setSubmissionMessage] = useState('');
  const history = useHistory(); // useHistoryフックを使用

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  const handleIdChange = (e) => {
    setId(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, language, id }),
      });

      if (response.ok) {
        setSubmissionMessage('アンケートが送信されました');
        history.push('/thankyou'); // ページ '/thankyou' に遷移

      } else {
        setSubmissionMessage('アンケートの送信に失敗しました')
      }
    } catch (error) {
      console.error('エラー:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded shadow-lg">
      <h1 className="text-2xl font-bold mb-4">アンケート</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-semibold text-gray-600">お名前:</label>
          <input id="name" type="text" onChange={handleNameChange} className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:border-blue-500" />
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-600">お好きな言語は何ですか？:</label>
          <select onChange={handleLanguageChange} className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:border-blue-500">
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
            <option value="other">その他</option>
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="id" className="block text-sm font-semibold text-gray-600">ID:</label>
          <input type="number" onChange={handleIdChange} className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:border-blue-500" />
        </div>

        <div className="mb-4">
          <button type="submit" className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:border-blue-700 focus:ring focus:ring-blue-200">回答する</button>
        </div>
      </form>

      {submissionMessage && <p className="text-sm text-green-500">{submissionMessage}</p>}
    </div>
  );
}

export default App;
