import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:5000",
    timeout: 10000,
});

// Response interceptor
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error(error.response?.data || error.message);
        return Promise.reject(error);
    }
);

export default axiosInstance;