import React, { useState } from "react";
import './App.css';
import { useForm } from "react-hook-form";

function App5() {
  const { register, handleSubmit, setValue, formState: { errors } }
   = useForm(
    { mode: "onChange",
   
       })
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [submissionMessage, setSubmissionMessage] = useState('');
  const [formData, setFormData] = useState({}); // formData を定義

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
      id: 4,
      question: "何歳ですか？:",
      type: "number", // "number2" を "number" に変更
      stateKey: "age",
    },
  ];

//   const handleInputChange = (stateKey, value) => {
//     setValue(stateKey, value);
//     setFormData((prevFormData) => ({
//       ...prevFormData,
//       [stateKey]: value,
//     }));
//   };

  const onSubmit = async (data) => {
    console.log(data);

    try {
      const response = await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSubmissionMessage('アンケートが送信されました');
      } else {
        setSubmissionMessage('アンケートの送信に失敗しました');
      }
    } catch (error) {
      console.error('エラー:', error);
    }
  };

  const renderInput = () => {
    const currentQuestionData = questions[currentQuestion];
    const { stateKey, type, options } = currentQuestionData;
  
    switch (type) {
      case "text":
        return (
          <input
            type="text"
            {...register("name", {
              required: "名前は必須です",
              minLength: { value: 4, message: "4文字以上で入力してください" },
            })}
            name={stateKey}
            className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:border-blue-500"
          />
        );
      case "select":
        return (
          <select
            className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:border-blue-500"
            {...register(stateKey)}
          >
            <option value="" disabled hidden>
              選択してください
            </option>
            {options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        );
      case "number":
        return (
          <input
            type="number"
            {...register(stateKey, { required: true })}
            className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:border-blue-500"
          />
        );
      default:
        return null;
    }
  };
  

  return (
    <div>
      <div className="max-w-md mx-auto p-4 bg-white rounded shadow-lg">
        <h1 className="text-2xl font-bold mb-4">アンケート</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-600">
              {questions[currentQuestion].question}
            </label>
            {renderInput()}
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
      </div>
    </div>
  );
}

export default App5;
