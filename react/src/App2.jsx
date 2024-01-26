import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Question1 from "./Question1"; // これらのファイルパスはプロジェクトの実際の構造に合わせて調整してください
import Question2 from "./Question2";
import Question3 from "./Question3";

const App = () => {
  const [name, setName] = useState('');
  const [language, setLanguage] = useState('');
  const [id, setId] = useState(0);
  const [submissionMessage, setSubmissionMessage] = useState('');

  const handleNameChange = (e) => {
    setName(e.target.value);
  }; 

  const handleLanguageChange = (e) => { 
    setLanguage(e.target.value);
  };

  const handleIdChange = (e) => {
    setId(e.target.value);
  } 
  
  const handleNext = () => {
    // You can add additional logic here if needed
  };

  const handleSubmit = async () => {
    // Submit logic 
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
      } else {
        setSubmissionMessage('アンケートの送信に失敗しました')
      }
    } catch (error) {
      console.error('エラー:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded shadow-lg">
      <Router>
        <Routes>
          <Route
            path="/"
            element={<Question1 onNext={handleNext} name={name} handleNameChange={handleNameChange} />}
          />
          <Route
            path="/question2"
            element={<Question2 onNext={handleNext} language={language} handleLanguageChange={handleLanguageChange} />}
          />
          <Route
            path="/question3"
            element={<Question3 onSubmit={handleSubmit} id={id} handleIdChange={handleIdChange} />}
          />
        </Routes>

        {submissionMessage && <p className="text-sm text-green-500">{submissionMessage}</p>}
      </Router>
    </div>
  );
}

export default App;
