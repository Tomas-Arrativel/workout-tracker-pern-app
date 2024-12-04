import axios from "axios";
import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const API_BASE_URL = "http://localhost:3000/api"; // for testing

const API = axios.create({
	baseURL: API_BASE_URL,
});

// Auth APIs
export const login = (credentials) =>
	API.post(`/users/login`, credentials, { withCredentials: true });
export const register = (userData) => API.post(`/users`, userData);

export const getCurrentUser = () =>
	API.get(`/users/check-auth`, { withCredentials: true });

export const logout = () => {
	API.get(`/users/logout`, { withCredentials: true })
		.then(() => {
			setIsAuthenticated(false);
			toast("Good byee!", {
				position: "top-center",
				autoClose: 2500,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: false,
				draggable: true,
				progress: undefined,
				theme: "colored",
			});
		})
		.catch((error) => {
			console.error("Logout failed", error);
		});
};
