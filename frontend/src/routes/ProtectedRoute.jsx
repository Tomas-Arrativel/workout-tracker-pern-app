import React from "react";
import { Navigate } from "react-router-dom";
import "./ProtectedRoute.css";

const ProtectedRoute = ({ isAuthenticated, isLoading, children }) => {
	if (isLoading) return <div className="loader">Loading...</div>;

	return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
