import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../api/api";
import { AuthContext } from "../../contexts/AuthContext";

const Login = () => {
	const [formData, setFormData] = useState({ username: "", password: "" });
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const { setIsAuthenticated } = useContext(AuthContext);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({ ...prevData, [name]: value }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError(null); // Reset error message
		setLoading(true); // Set loading state

		try {
			const response = await login(formData); // Call the login API
			console.log(response.data);
			setIsAuthenticated(true);
			navigate("/dashboard"); // Redirect to dashboard
		} catch (err) {
			setError(err.response?.data?.message || "Invalid username or password");
		} finally {
			setLoading(false); // Reset loading state
		}
	};

	return (
		<div className="login-container">
			<h2>Login</h2>
			<form onSubmit={handleSubmit} className="login-form">
				<div className="form-group">
					<label htmlFor="username">Username:</label>
					<input
						type="text"
						id="username"
						name="username"
						value={formData.username}
						onChange={handleChange}
						placeholder="Enter your username"
						required
					/>
				</div>
				<div className="form-group">
					<label htmlFor="password">Password:</label>
					<input
						type="password"
						id="password"
						name="password"
						value={formData.password}
						onChange={handleChange}
						placeholder="Enter your password"
						required
					/>
				</div>
				{error && <p className="error-message">{error}</p>}
				<button type="submit" className="login-button" disabled={loading}>
					{loading ? "Logging in..." : "Login"}
				</button>
			</form>
		</div>
	);
};

export default Login;
