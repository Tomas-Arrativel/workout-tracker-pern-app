import { useState, useEffect } from "react";
import { getCurrentUser } from "../api/api";

const useAuth = () => {
	const [user, setUser] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const response = await getCurrentUser();
				setUser(response.data);
			} catch (error) {
				console.error("Error fetching user:", error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchUser();
	}, []);

	return { user, isLoading };
};

export default useAuth;
