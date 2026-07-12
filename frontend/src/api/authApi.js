import axiosInstance from './axiosInstance';

// Backend expects: /api/v1/auth/register and /api/v1/auth/login
const API_PREFIX = '/api/v1/auth';

export const registerRequest = async ({ name, email, password }) => {
  const res = await axiosInstance.post(`${API_PREFIX}/register`, {
    name,
    email,
    password,
  });
  return res.data;
};

export const loginRequest = async ({ email, password }) => {
  const res = await axiosInstance.post(`${API_PREFIX}/login`, {
    email,
    password,
  });
  return res.data;
};

