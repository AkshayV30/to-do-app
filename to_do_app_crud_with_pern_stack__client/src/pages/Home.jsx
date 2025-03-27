import React from "react";
import InputTodo from "../components/InputTodo";
import ListTodos from "../components/ListTodos";

const Home = () => {
  return (
    <div className="container">
      <h1 className="text-center mt-5">Todo List </h1>
      <h6 className="text-center ">in PERN Tech Stack</h6>
      <InputTodo />
      <ListTodos />
    </div>
  );
};

export default Home;
