import React, { createContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null); // Holds user data
	const [token, setToken] = useState(localStorage.getItem("token")); // Load token from localStorage

	const login = (userData, token) => {
		setUser(userData);
		setToken(token);
		localStorage.setItem("token", token); // Save token for persistence
	};

	const logout = () => {
		setUser(null);
		setToken(null);
		localStorage.removeItem("token"); // Remove token from localStorage
	};

	return (
		<AuthContext.Provider value={{ user, token, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthContext;
