import axios from "axios";
export const BASE_URL = import.meta.env.VITE_REACT_APP_API_URL || 'http://localhost:3500';
axios.defaults.withCredentials = true;

export default axios.create({
  baseURL: `${BASE_URL}/api`,
});

export const axiosPrivate = axios.create({
  baseURL: `${BASE_URL}/api`,
  headers: { 'Content-Type': 'multipart/form-data' },
  withCredentials: true
});
