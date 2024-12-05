import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

import "./ProtectedRoute.css";

const ProtectedRoute = () => {
	const { isAuthenticated, isLoading } = useContext(AuthContext);

	if (isLoading === true) {
		// You can show a loader while the authentication status is being checked
		return <div className="loader">Checking authentication...</div>;
	}

	// If authenticated, render the protected route's children
	return !isLoading && isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
