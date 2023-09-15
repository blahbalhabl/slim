import axios from "axios";
export const BASE_URL = 'http://192.168.1.156:3500' // Change the IP address to the IP Address hosting the server and Web App

axios.defaults.withCredentials = true;

export default axios.create({
  baseURL: `${BASE_URL}/api`,
});

export const axiosPrivate = axios.create({
  baseURL: `${BASE_URL}/api`,
  headers: { 'Content-Type': 'multipart/form-data' },
  withCredentials: true
});
