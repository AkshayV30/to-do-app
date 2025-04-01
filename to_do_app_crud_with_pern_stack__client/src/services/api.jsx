import axios from "axios";

// const API_BASE_URL = "http://localhost:5000/v1/todos";
const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:5000/v1/todos";

// Log API URL (only in development)
if (process.env.NODE_ENV !== "production") {
  console.log("🛠 Using API Base URL:", API_BASE_URL);
}

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
