import axios from "axios";

const API_BASE_URL = "http://localhost:3000/api"; // for testing

const API = axios.create({
	baseURL: API_BASE_URL,
});

// Auth APIs
export const login = async (credentials) =>
	await API.post(`/users/login`, credentials, { withCredentials: true });

export const register = async (userData) => await API.post(`/users`, userData);

export const getCurrentUser = async () =>
	await API.get(`/users/check-auth`, { withCredentials: true });

export const logout = async () =>
	await API.get(`/users/logout`, { withCredentials: true });

// Routines APIs
export const getRoutinesByUser = async () =>
	await API.get(`/routines/my-routines`, { withCredentials: true });
