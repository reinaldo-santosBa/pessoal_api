import axios from "axios";

const api = axios.create({
  baseURL: process.env.HOST_API_SGN,
});

export default api;
