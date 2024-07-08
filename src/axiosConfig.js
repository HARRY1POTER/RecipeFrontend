// axiosConfig.js

import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  timeout: 10000, // Adjust as needed
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to prepend baseURL to all requests
instance.interceptors.request.use(
  (config) => {
    // Modify config here if needed
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle responses
instance.interceptors.response.use(
  (response) => {
    // Handle successful responses here
    return response;
  },
  (error) => {
    // Handle errors here
    return Promise.reject(error);
  }
);

export default instance;
