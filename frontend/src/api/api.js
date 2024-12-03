import axios from "axios";

const API_BASE_URL = "http://localhost:3000/api"; // for testing

const API = axios.create({
	baseURL: API_BASE_URL,
});

// Auth APIs
export const login = (credentials) => API.post(`/users/login`, credentials);
export const register = (userData) => API.post(`/users`, userData);
export const getCurrentUser = () => API.get(`/users/profile`);
