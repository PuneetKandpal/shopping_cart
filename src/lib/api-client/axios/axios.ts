import axios from "axios";


const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL, 
    timeout: 100000,
  });

export default axiosInstance;