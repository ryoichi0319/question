// Question3.jsx

import React from "react";

const Question3 = ({ onSubmit, id, handleIdChange }) => {

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
    // You may want to add additional logic here, or navigate to another page after submission
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">アンケート - 質問 3</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="id" className="block text-sm font-semibold text-gray-600">ID:</label>
          <input type="number" value={id} onChange={handleIdChange} className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:border-blue-500" />
        </div>
        <div className="mb-4">
          <button type="submit" className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:border-blue-700 focus:ring focus:ring-blue-200">回答する</button>
        </div>
      </form>
    </div>
  );
};

export default Question3;
