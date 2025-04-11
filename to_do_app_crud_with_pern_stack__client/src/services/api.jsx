import axios from "axios";

// const API_BASE_URL = "http://localhost:5000/v1/todos";
const API_BASE_URL = "https://to-do-app-ragl.onrender.com/v1/todos";

// const API_BASE_URL =
//   process.env.APP_API_BASE_URL || `http://localhost:5000/v1/todos/`;

// console.log("API Base URL:", API_BASE_URL);

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
});

// Response interceptor: catch network errors (no response)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      // Network or server-down error
      alert(
        `⚠️ Unable to reach the server.
         Make sure backend server is running or try again later.`
      );
    }
    return Promise.reject(error);
  }
);

export const getTodos = async () => {
  try {
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
  } catch (err) {
    if (err.response) {
      alert(
        `Error ${err.response.status}: ${
          err.response.data.error || err.response.statusText
        }`
      );
    }
    return [];
  }
};

export const addTodo = async (description) => {
  // const response = await axios.post(API_BASE_URL, { description });
  try {
    const response = await api.post("/", { description });
    return response.data;
  } catch (err) {
    if (err.response) {
      alert(
        `Error ${err.response.status}: ${
          err.response.data.error || err.response.statusText
        }`
      );
    }
    throw err;
  }
};

export const updateTodo = async (id, description) => {
  // const response = await axios.put(`${API_BASE_URL}/${id}`, { description });

  try {
    const response = await api.put(`/${id}`, { description });
    return response.data;
  } catch (err) {
    if (err.response) {
      alert(
        `Error ${err.response.status}: ${
          err.response.data.error || err.response.statusText
        }`
      );
    }
    throw err;
  }
};

export const deleteTodo = async (id) => {
  try {
    // return axios.delete(`${API_BASE_URL}/${id}`);
    const response = await api.delete(`/${id}`);
    return response.data;
  } catch (err) {
    if (err.response) {
      alert(
        `Error ${err.response.status}: ${
          err.response.data.error || err.response.statusText
        }`
      );
    }
    throw err;
  }
};
