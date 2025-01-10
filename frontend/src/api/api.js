import axios from "axios";

const API_BASE_URL = "http://localhost:3000/api"; // for testing

const API = axios.create({
	baseURL: API_BASE_URL,
	withCredentials: true,
});

// Auth APIs
export const login = async (credentials) =>
	await API.post(`/users/login`, credentials);

export const register = async (userData) => await API.post(`/users`, userData);

export const getCurrentUser = async () => await API.get(`/users/check-auth`);

export const logout = async () => await API.get(`/users/logout`);

// Days APIs
export const getDays = async () => await API.get(`/days`);
export const getDayById = async (day) => await API.get(`/days/${day}`);

// Routines APIs
export const getRoutinesByUser = async () =>
	await API.get(`/routines/my-routines`);

export const getRoutinesByDay = async (day) =>
	await API.get(`/routines/my-routines/${day}`);

export const getRoutineExercisesByDay = async (day) =>
	await API.get(`/r-exercises/${day}`);

// Exercises APIs
export const getExercisesNames = async (exId) =>
	await API.get(`/exercises/${exId}`);

export const getMuscleGroups = async () =>
	await API.get(`/exercises/muscles/groups`);

export const getExercisesByMuscle = async (muscleGroup) =>
	await API.post(`/exercises/muscles/filtered`, { muscleGroup });

export const addExerciseToRoutine = async (routineId, exerciseId, sets, reps) =>
	await API.post(`/r-exercises/add`, { routineId, exerciseId, sets, reps });
