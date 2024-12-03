import React from "react";
import { Routes, Route } from "react-router-dom";
import { Home, Login, Dashboard, NotFound } from "./pages/exports";
import ProtectedRoute from "./routes/ProtectedRoute";
import useAuth from "./hooks/useAuth";

const App = () => {
	const { user, isLoading } = useAuth();
	const isAuthenticated = Boolean(user);

	return (
		<Routes>
			{/* Public Routes */}
			<Route path="/login" element={<Login />} />

			{/* Protected Routes */}
			<Route
				path="/"
				element={
					<ProtectedRoute
						isAuthenticated={isAuthenticated}
						isLoading={isLoading}
					>
						<Home />
					</ProtectedRoute>
				}
			/>
			<Route
				path="/dashboard"
				element={
					<ProtectedRoute
						isAuthenticated={isAuthenticated}
						isLoading={isLoading}
					>
						<Dashboard />
					</ProtectedRoute>
				}
			/>

			{/* Catch-all Route (404) */}
			<Route path="*" element={<NotFound />} />
		</Routes>
	);
};

export default App;
