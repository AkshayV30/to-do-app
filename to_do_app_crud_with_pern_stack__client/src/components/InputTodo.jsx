import React, { useState } from "react";
import { useTodos } from "../hooks/useTodos";

const InputTodo = () => {
  const [description, setDescription] = useState("");
  const { addTodoMutation } = useTodos();

  const onSubmitForm = async (e) => {
    e.preventDefault();
    addTodoMutation.mutate(description, {
      onSuccess: () => setDescription(""),
    });
  };

  return (
    <div>
      <form className="d-flex mt-5" onSubmit={onSubmitForm}>
        <input
          type="text"
          className="form-control"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button className="btn btn-success">Add</button>
      </form>
    </div>
  );
};

export default InputTodo;
