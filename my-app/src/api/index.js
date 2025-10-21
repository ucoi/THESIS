import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080",
});

export const UserSignUp = (data) => API.post("/user/signup", data);
export const UserSignIn = (data) => API.post("/user/signin", data);

export const getDashboardDetails = (token) =>
  API.get("/user/dashboard", {
    headers: { Authorization: `Bearer ${token}` },
  });

export const getWorkouts = (token, date) =>
  API.get("/user/workout", {
    headers: { Authorization: `Bearer ${token}` },
    params: { date },
  });

export const addWorkout = (token, data) =>
  API.post("/user/workout", data, {
    headers: { Authorization: `Bearer ${token}` },
  });

const token = "YOUR_TOKEN";
axios
  .post(
    "http://localhost:8080/user/workout",
    {
      category: "legs",
      workout: "squat 3x8",
    },
    { headers: { Authorization: `Bearer ${token}` } }
  )
  .then((res) => console.log(res.data))
  .catch((err) => console.error(err?.response?.data || err));
