// src/services/api.js
import axios from 'axios';
import Cookies from 'js-cookie';

const api = axios.create({
  baseURL: 'http://localhost:8080/',
  headers: {
          'Content-Type': 'application/json'
            },
  // withCredentials:true
 // Replace with your API base URL
});

// Add a request interceptor
// api.interceptors.request.use(
//   (config) => {
//     config.withCredentials = true;
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

      const isTokenExpired = error.response?.data?.status === 777;// If sending custom status code
    // Only attempt refresh for token expiration
    if (isTokenExpired && !originalRequest._retry) {
      originalRequest._retry = true;
      Cookies.remove("accessToken");
      try {
        const refreshToken = Cookies.get("refreshToken");
        const data = {
          refreshToken,
        }
        const response = await api.post('/refresh', data, {
          withCredentials: true
        });
        console.log("/refresh has been hit...")
        console.log(response.data.message);
        // Retry original request
        return api(originalRequest);

      } catch (refreshError) {
        Cookies.remove("accessToken", { path: "/" });
        Cookies.remove("refreshToken", { path: "/" });        
        // const navigate = Navigate();
        // navigate("/login");
        return Promise.reject(refreshError);
      }
    }
    // For all other errors, reject normally
    return Promise.reject(error);
  }
);

export default api;
