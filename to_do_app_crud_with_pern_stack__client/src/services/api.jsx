import axios from "axios";

// const API_BASE_URL = "http://localhost:5000/v1/todos";
const API_BASE_URL = "https://to-do-app-ragl.onrender.com/v1/todos";

// const API_BASE_URL =
//   process.env.APP_API_BASE_URL || "http://localhost:5000/v1/todos";

console.log("API Base URL:", API_BASE_URL);

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const getTodos = async () => {
  // const response = await axios.get(API_BASE_URL);
  const response = await api.get("/");
  const data = response.data;

  if (Array.isArray(data)) {
    return data;
  } else if (Array.isArray(data.data)) {
    return data.data;
  } else {
    console.error("Invalid response format:", data);
    return [];
  }
};

export const addTodo = async (description) => {
  // const response = await axios.post(API_BASE_URL, { description });

  const response = await api.post("/", { description });
  return response.data;
};

export const updateTodo = async (id, description) => {
  // const response = await axios.put(`${API_BASE_URL}/${id}`, { description });
  const response = await api.put(`/${id}`, { description });
  return response.data;
};

export const deleteTodo = async (id) => {
  // return axios.delete(`${API_BASE_URL}/${id}`);
  const response = await api.delete(`/${id}`);
  return response.data;
};
