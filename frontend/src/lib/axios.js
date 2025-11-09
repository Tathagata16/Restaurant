import axios from "axios"

const axiosInstance = axios.create({
    baseURL:"http://localhost:3000/tomato",
    ContentType:"application/json",
})

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("adminToken"); // or "adminToken"
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getHomeData = ()=> axiosInstance.get('/');
export default axiosInstance;