import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getTodos, addTodo, updateTodo, deleteTodo } from "../services/api";

export const useTodos = () => {
  const queryClient = useQueryClient();

  const {
    data: todos,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: getTodos,
  });

  const addTodoMutation = useMutation({
    mutationFn: addTodo,
    onSuccess: () => queryClient.invalidateQueries(["todos"]),
  });

  const updateTodoMutation = useMutation({
    mutationFn: ({ id, description }) => updateTodo(id, description),
    onSuccess: () => queryClient.invalidateQueries(["todos"]),
  });

  const deleteTodoMutation = useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => queryClient.invalidateQueries(["todos"]),
  });

  return {
    todos,
    isLoading,
    error,
    addTodoMutation,
    updateTodoMutation,
    deleteTodoMutation,
  };
};
