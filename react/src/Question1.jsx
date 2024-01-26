// Question1.jsx

import React from "react";
import { useNavigate } from "react-router-dom";

const Question1 = ({ onNext, name, handleNameChange }) => {
  const navigate = useNavigate();

  const handleNext = (e) => {
    e.preventDefault();
    onNext();
    navigate("/question2"); // Navigate to the next question
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">アンケート - 質問 1</h1>
      <form onSubmit={handleNext}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-semibold text-gray-600">お名前:</label>
          <input id="name" type="text" value={name} onChange={handleNameChange} className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:border-blue-500" />
        </div>
        <div className="mb-4">
          <button type="submit" className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:border-blue-700 focus:ring focus:ring-blue-200">次へ</button>
        </div>
      </form>
    </div>
  );
};

export default Question1;
