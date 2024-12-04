import React, { createContext, useState, useEffect } from "react";
import { getCurrentUser, logout } from "../api/api";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [sessionData, setSessionData] = useState({});
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		const checkAuth = async () => {
			try {
				setIsLoading(true);
				const { data } = await getCurrentUser();
				setIsAuthenticated(true);
			} catch (error) {
				console.error("Error checking authentication:", error);
				setIsAuthenticated(false);
			} finally {
				setIsLoading(false);
			}
		};

		checkAuth();
	}, []);

	return (
		<AuthContext.Provider
			value={{
				isAuthenticated,
				setIsAuthenticated,
				isLoading,
				sessionData,
				setSessionData,
			}}
		>
			{children}
			<ToastContainer
				position="top-center"
				autoClose={4000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover={false}
				theme="colored"
			/>
		</AuthContext.Provider>
	);
};