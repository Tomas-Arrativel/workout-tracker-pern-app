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

// Days
export const getDays = async () => await API.get(`/days`);
export const getDayById = async (day) => await API.get(`/days/${day}`);

// Routines APIs
export const getRoutinesByUser = async () =>
	await API.get(`/routines/my-routines`, { withCredentials: true });

export const getRoutinesByDay = async (day) =>
	await API.get(`/routines/my-routines/${day}`, { withCredentials: true });

export const getRoutineExercisesByDay = async (day) =>
	await API.get(`/r-exercises/${day}`, { withCredentials: true });

export const getExercisesNames = async (exId) =>
	await API.get(`/exercises/${exId}`);
