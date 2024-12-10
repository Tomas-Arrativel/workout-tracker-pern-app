import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import { NotFound, Login, Dashboard, Register } from "./pages/exports";
import Navbar from "./components/Navbar/Navbar";
import ProtectedRoute from "./routes/ProtectedRoute";

import "./index.css";
import { AuthProvider } from "./contexts/AuthContext";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Navbar />,
		errorElement: <NotFound />,
		children: [
			{
				path: "/",
				element: <App />,
			},
			{
				path: "/login",
				element: <Login />,
			},
			{
				path: "/register",
				element: <Register />,
			},
			{
				element: <ProtectedRoute />, // Use ProtectedRoute here
				children: [
					{
						path: "/dashboard",
						element: <Dashboard />,
					},
				],
			},
		],
	},
]);

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<AuthProvider>
			<RouterProvider router={router} />
		</AuthProvider>
	</StrictMode>
);
