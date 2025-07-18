import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.NODE_ENV === "development" ? "http://localhost:3000/api" : "/api", // Adjust the URL based on the environment
  // baseURL: import.meta.env.VITE_ENV === "development" ? "http://localhost:3000/api" : "/api",

  // baseURL: import.meta.env.MODE === "development" ? "http://localhost:3000/api" : "/api",

  // baseURL: "http://localhost:3000/api", // Adjust the URL based on the environment
  withCredentials: true,  // send cookies with requests
});

console.log("Base URL:", axiosInstance.defaults.baseURL);


export default axiosInstance;
