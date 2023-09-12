import axios from "axios";
export const BASE_URL = 'http://localhost:3500'

axios.defaults.withCredentials = true;

export default axios.create({
  baseURL: `${BASE_URL}/api`,
});

export const axiosPrivate = axios.create({
  baseURL: `${BASE_URL}/api`,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true
});
