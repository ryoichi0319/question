import React, { useState } from "react";
import './App.css';
import { useForm } from "react-hook-form";

function App5() {
    const {register,handleSubmit, watch, formState: {errors}} = useForm({mode: "onChange"})
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
  const onSubmit = (data) =>{
   console.log(data)
  }


  
  return (
    <div>
        <form action="" onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="name">お名前:</label>
    <input type="text" id="name" {...register("name", { required: "名前は必須です", minLength:{value: 4, message: "4文字以上で入力してください"} })} />
    <p className=" text-red-600">{errors.name && errors.name.message}</p>

            <label htmlFor="email">メールアドレス</label>
            <input type="email" id="email" {...register("email")}/>

            <label htmlFor="password">名前</label>
            <input type="password" id="password" {...register("password")}/>

            <button type="submit">送信</button>
           
        </form>

    </div>
  )
   
}

export default App5;
