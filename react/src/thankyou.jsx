import React from 'react'
import App4 from "./App4"

const Thankyou = () => {
  return (
    <div className="min-h-screen   w-full items-center">
    <div className=" md:w-8/12 lg:w-6/12 mx-auto">
      <div className="bg-white shadow-lg rounded-md p-4">
        <App4 />
      </div>
    </div>
    <div className="w-full md:w-4/12 lg:w-6/12 mx-auto">
      <div className="bg-white shadow-lg rounded-md p-4">
        <h1 className="text-center text-2xl font-bold mb-4">Thank you!</h1>
        <p className="text-center text-lg mb-4">Your submission has been received.</p>
        <a href="/" className="text-center text-blue-500">Go to home page</a>
      </div>
    </div>
  </div>
  )
}

export default Thankyou