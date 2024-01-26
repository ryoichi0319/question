import React, { useState } from "react";
import './App.css';
import { useForm } from "react-hook-form";

function App3() {
    const {register, watch, formState: {errors}} = useForm()
  const questions = [
    {
      id: 1,
      question: "お名前:",
      type: "text",
      stateKey: "name",
    },
    {
      id: 2,
      question: "お好きな言語は何ですか？:",
      type: "select",
      stateKey: "language",
      options: ["JavaScript", "Python", "Java", "その他"],
    },
    {
      id: 3,
      question: "ID:",
      type: "number",
      stateKey: "id",
    },
   {
      id: 4,
      question: "何歳ですか？:",
      type: "number",
      stateKey: "age",
    },
  ];

  const [formData, setFormData] = useState({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [submissionMessage, setSubmissionMessage] = useState('');

  const handleInputChange = (stateKey, value) => {
    if (stateKey === "name" && value.length > 10) {
      // 名前は10文字以下である必要があります
      console.log("名前は10文字以下である必要があります");
      setSubmissionMessage("名前は10文字以内で入力してください");
    } else if (stateKey === "name" && value.trim() === "") {
     
      // 名前が空白です
      setSubmissionMessage("名前は必須です");
      
    } else {
      // エラーメッセージをリセット
      setSubmissionMessage("");
    }
    setFormData((prevData) => ({

      ...prevData,
      [stateKey]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isAgeValid = /^\d+$/.test(formData.age);
    if (!isAgeValid) {
      setSubmissionMessage('年齢は数字で入力してください。');
      return; // バリデーションエラーがあるため、以下の処理を実行せずに終了
    }


  

    try {
      const response = await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmissionMessage('アンケートが送信されました');
        console.log(response,"response")
        // window.location.reload();

      } else {
        setSubmissionMessage('アンケートの送信に失敗しました')
      }
    } catch (error) {
      console.error('エラー:', error);
    }
  };
console.log(formData[questions[currentQuestion].stateKey],"!")  
  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded shadow-lg">
      <h1 className="text-2xl font-bold mb-4">アンケート</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-600">
            {questions[currentQuestion].question}
          </label>
    {questions[currentQuestion].type === "select" ? (
           <select
           value={formData[questions[currentQuestion].stateKey] || ''}
           onChange={(e) =>
             handleInputChange(questions[currentQuestion].stateKey, e.target.value)
           }
           className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:border-blue-500"
         >
           <option value="" disabled hidden>
             選択してください
           </option>
           {questions[currentQuestion].options.map((option) => (
             <option key={option} value={option}>
               {option}
             </option>
           ))}
         </select>
          ) : (
            <input
              type={questions[currentQuestion].type}
              value={formData[questions[currentQuestion].stateKey] || ''}
              {...register("name",{required: true})}
              onChange={(e) =>
                handleInputChange(questions[currentQuestion].stateKey, e.target.value)
              }
              className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:border-blue-500"
            />
            
          )}
        </div>
     
        <div className="mb-4">
          <button
            type="button"
            onClick={() => setCurrentQuestion((prev) => Math.max(prev - 1, 0))}
            disabled={currentQuestion === 0}
            className="mr-2 px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:border-blue-700 focus:ring focus:ring-blue-200"
          >
            前へ
          </button>
          <button
            type="button"
            onClick={() => setCurrentQuestion((prev) => Math.min(prev + 1, questions.length - 1))}
            // disabled={currentQuestion === questions.length - 1 || (questions[0].stateKey  === "name" )}
            className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:border-blue-700 focus:ring focus:ring-blue-200"
          >
            次へ
          </button>
          {currentQuestion === questions.length - 1 && (
            <button
              type="submit"
              className="ml-2 px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:border-blue-700 focus:ring focus:ring-blue-200"
            >
              回答する
            </button>
          )}
        </div>
      </form>

      {submissionMessage && <p className="text-sm text-green-500">{submissionMessage}</p>}
    </div>
  );
}

export default App3;
