import axios from "axios";

// const API_BASE_URL = "http://localhost:5000/v1/todos";
// const API_BASE_URL =
//   process.env.REACT_APP_API_BASE_URL || "http://localhost:5000/v1/todos";

const API_BASE_URL = "https://to-do-app-ragl.onrender.com/v1/todos";
// console.log("API Base URL:", process.env.REACT_APP_API_BASE_URL);

export const getTodos = async () => {
  const response = await axios.get(API_BASE_URL);
  return response.data;
};

export const addTodo = async (description) => {
  const response = await axios.post(API_BASE_URL, { description });
  return response.data;
};

export const updateTodo = async (id, description) => {
  const response = await axios.put(`${API_BASE_URL}/${id}`, { description });

  return response.data;
};

export const deleteTodo = async (id) => {
  return axios.delete(`${API_BASE_URL}/${id}`);
};
