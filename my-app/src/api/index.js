import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080",
});

// Add token to every request automatically
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const UserSignUp = async (data) => await API.post("/user/signup", data);
export const UserSignIn = async (data) => await API.post("/user/signin", data);
export const getDashboardDetails = async () => await API.get("/user/dashboard");
export const getWorkouts = async (date) =>
  await API.get(`/user/workout${date ? `?date=${date}` : ""}`);
export const addWorkout = async (data) => await API.post("/user/workout", data);

export default API;
