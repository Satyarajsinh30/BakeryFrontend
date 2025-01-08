// src/services/authService.js
import api from './index';

export const login = async (credentials) => {
  const response = await api.post('/login', credentials,{
    withCredentials:true
  });
  return response.data;
};

export const register = async (userData) => {
  const response = await api.post('/signup', userData);
  return response.data;
};
