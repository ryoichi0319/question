import React, { useState } from "react";
import './App.css';
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom"; // React RouterからuseHistoryをインポート

function App7() {
  const { register, handleSubmit,watch,  formState: { errors } }
   = useForm(
    { mode: "onChange",
    defaultValues :{
        name: '',
        age: 20,
        language: "JavaScript"
        
    }
   
       })
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [submissionMessage, setSubmissionMessage] = useState('');
  const navigate = useNavigate(); // useNavigateフックを使用するように更新

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
      question: "何歳ですか？:",
      type: "number", // "number2" を "number" に変更
      stateKey: "age",
    },
  ];
  console.log(currentQuestion)

//   const handleInputChange = (stateKey, value) => {
//     setValue(stateKey, value);
//     setFormData((prevFormData) => ({
//       ...prevFormData,
//       [stateKey]: value,
//     }));
//   };

let watchName = watch("name");
let watchName2 = !!watchName
const watchLanguage = watch("language");
const watchAge = watch("age");

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
        navigate("/thankyou"); // 成功時にリダイレクト

        setSubmissionMessage('アンケートが送信されました');
         } 
         else {
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
            <>
            <input
              type="text"
              {...register(stateKey, { required:  "名前は必須です" , minLength:{value: 4, message: "4文字以上で入力してください"}})}
              className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:border-blue-500"
            />
            
            <p className=" text-red-600">{errors.name && errors.name.message}</p>
            </>
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
            <>
          <input
            type="number"
            {...register(stateKey, { required:  true, min:18, max:99,   })}
            className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:border-blue-500"
          />
          
            {errors.age && errors.age.type === "required" && "年齢は必須です"}
            {errors.age && errors.age.type === "min" && "年齢は18歳以上である必要があります"}
            {errors.age && errors.age.type === "max" && "年齢は99歳以下である必要があります"}          </>

        );
      default:
        return null;
    }
  };
  

  return (
    <div>
      <div className="max-w-md mx-auto p-4 bg-white rounded shadow-lg mt-10">
        <h1 className="text-2xl font-bold mb-4">アンケートああああ</h1>
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
              disabled={errors.name || watchName2 === false }
              onClick={() => setCurrentQuestion((prev) => Math.min(prev + 1, questions.length - 1)) }
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
    </div>
  );
}

export default App7;
