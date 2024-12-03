import { useState, useEffect } from "react";
import { getCurrentUser } from "../api/api";

const useAuth = () => {
	const [user, setUser] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const token = localStorage.getItem("token");

		if (!token) {
			console.log("No token found; user is not authenticated.");
			setIsLoading(false);
			return;
		}

		console.log("Fetching user...");
		getCurrentUser()
			.then((userData) => {
				setUser(userData);
				console.log("User data fetched:", userData);
			})
			.catch((error) => {
				console.error("Error fetching user:", error);
				localStorage.removeItem("token"); // Remove invalid token if necessary
			})
			.finally(() => {
				setIsLoading(false);
			});
	}, []);

	return { user, isLoading };
};

export default useAuth;
