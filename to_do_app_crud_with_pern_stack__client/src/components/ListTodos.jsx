import React from "react";
import { useTodos } from "../hooks/useTodos";
import EditTodo from "./EditTodo";

const ListTodos = () => {
  const { todos, isLoading, error, deleteTodoMutation } = useTodos();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading todos</p>;

  return (
    <table className="table mt-5 text-center">
      <thead>
        <tr>
          <th>Description</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {todos?.map((todo) => (
          <tr key={todo.todo_id}>
            <td>{todo.description}</td>
            <td>
              <EditTodo todo={todo} />
            </td>
            <td>
              <button
                className="btn btn-danger"
                onClick={() =>
                  deleteTodoMutation.mutate(todo.todo_id, {
                    onError: (err) =>
                      alert("Error deleting todo: " + err.message),
                  })
                }
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ListTodos;
